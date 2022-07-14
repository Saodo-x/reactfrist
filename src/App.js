import './App.css'
import React from "react";
import MainList from './components/MainList'
import Footer from "./components/Footer";
import Header from "./components/Header";
import {nanoid} from "nanoid";
import PubSub from "pubsub-js";

function getStatistics (data){
    return data.reduce((total, item) => {
        if (item.accomplish) {
            total++
        }
        return total
    }, 0)
}

export default class App extends React.Component {
    state = {
        listContent: [
            {content: '睡觉', id: nanoid(), accomplish: true},
            {content: '吃饭', id: nanoid(), accomplish: false},
            {content: '学习', id: nanoid(), accomplish: false}
        ],
        statistics: 0,
        statisticsAll: false,
    }

    UNSAFE_componentWillMount() {
        this.setState({statistics:getStatistics(this.state.listContent)},()=>{
            if (this.state.statistics === this.state.listContent.length){
                this.setState({statisticsAll:true})
            }
        })
        console.log('sss')
    }

    componentDidMount() {
        this.destroy = PubSub.subscribe('getTxt',(_,data)=>{
            if (data.trim()){
                const newList =  this.state.listContent
                const value = {content: data, id: nanoid(), accomplish: false}
                newList.push(value)
                this.setState({listContent: newList})
            }else {
                alert("输入不能为空！")
            }
        })

        this.getNum = PubSub.subscribe('getNum',(_,data)=>{
            const state = this.state
            let newNum = state.statistics
            if (data.accomplish === true){
                newNum++
                this.setState({statistics:newNum})
                // console.log(newNum)
                // console.log(this.state.statistics)
            }else {
                newNum--
                this.setState({statistics:newNum})
                // console.log(newNum)
                // console.log(this.state.statistics)
            }
            // console.log('getNum',state.statistics)
            this.setState({statisticsAll:newNum === state.listContent.length})
        })

        this.changeStatistics = PubSub.subscribe('changeStatistics',(_,data)=>{
            const list = this.state.listContent
            this.setState({statistics:data ? list.length : 0})
            if (data){
                list.forEach((item)=>{
                    if (!item.accomplish){
                        item.accomplish = true
                    }
                })
            }else {
                list.forEach((item)=>{
                    if (item.accomplish){
                        item.accomplish = false
                    }
                })
            }
            this.setState({listContent:list})
            this.setState({statisticsAll:data})
        })

        this.deleteList = PubSub.subscribe('deleteList',(_,data)=>{
            const listContent = this.state.listContent
            const indexList = listContent.findIndex((item)=>{
                return item.id === data
            })
            listContent.splice(indexList,1)
            this.setState({listContent:listContent})
            // this.setState({statistics:getStatistics(this.state.listContent)})
            let num = this.state.listContent.reduce((total,item)=>{
                if (item.accomplish){
                    total++
                }
                return total
            },0)
            this.setState({statistics:num})
            const aaa = listContent.length ? listContent.every(item => item.accomplish === true) : false
            this.setState({statisticsAll:aaa})
            console.log(this.state)
        })
    }

    componentWillUnmount() {
        PubSub.clearAllSubscriptions()
    }

    deleteAll = (list)=>{
        this.setState({listContent:list})
        this.setState({statistics:getStatistics(list)})
        if (this.state.statisticsAll){
            this.setState({statisticsAll:false},()=>{
                // console.log(this.state.statisticsAll)
            })
        }
    }

    render() {
        const list = this.state.listContent
        // console.log('aaa',this.state.statistics)

        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header />
                    <MainList listContent={list} />
                    <Footer deleteAll={this.deleteAll} list={list} num={list.length} statistics={this.state.statistics} statisticsAll={this.state.statisticsAll}/>
                </div>
            </div>
        );
    }
}
