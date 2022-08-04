import './App.css'
import React from "react";
import MainList from './components/MainList'
import Footer from "./components/Footer";
import Header from "./components/Header";
import {nanoid} from "nanoid";
import PubSub from "pubsub-js";
import {connect} from "react-redux";
import SlideShow from "./pages/slideshow";
import {getStatistics} from "./js/getTxt";
import ShowAlert from "./components/showalert";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import AddInDetail from "./pages/AddInDetail";

function DeleteList (data,self){
    let num
    const listContent = self.state.listContent
    if (typeof data !== 'string'){
        data = data.id
    }
    const indexList = listContent.filter((item)=>{
        return item.id !== data
    })
    self.setState({listContent:indexList},()=>{
        num = self.state.listContent.reduce((total,item)=>{
            if (item.accomplish){
                total++
            }
            return total
        },0)
        self.setState({statistics:num})
    })
    const aaa = listContent.length ? listContent.every(item => item.accomplish === true) : false
    self.setState({statisticsAll:aaa})
}

class App extends React.Component {
    state = {
        listContent: this.props.lists || JSON.parse(localStorage.getItem('List')),
        statistics: 0,
        statisticsAll: false,
        exchanges: true,
        sureAlert: {
            showAlert: false,
            title: '提示',
            id: '',
            people: '',
            content: "哈哈哈哈哈",
            btns: ""
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({statistics:getStatistics(this.state.listContent)},()=>{
            if (this.state.statistics === this.state.listContent.length){
                this.setState({statisticsAll:true})
            }
        })
        // console.log('sss')
    }

    componentDidMount() {
        this.destroy = PubSub.subscribe('getTxt',(_,value)=>{
            const {data,title} = value
            if (data.trim()){
                const newList =  this.state.listContent
                const value = {content: data, id: nanoid(), accomplish: false ,title: title, addPeople: 'xsw'}
                newList.push(value)
                this.setState({listContent: newList})
            }else {
                alert("输入不能为空！")
            }
        })

        this.getDetail = PubSub.subscribe('getDetail',(_,data)=>{
            const list = this.state.listContent
            this.setState({listContent: [...list,data]})
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

        this.deleteList = PubSub.subscribe('deleteList',(_,data) => DeleteList(data,this))
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

    contentCompile = (list)=>{
        const listContent = this.state.listContent
        if (list.content.trim()){
            const newList = listContent.map((item)=>{
                if (item.id === list.id){
                    item.content = list.content
                }
                return item
            })
            this.setState({listContent: newList})
        }else {
            DeleteList(list,this)
            console.log(list)
        }
    }

    addSocial = (data)=>{
        const List =  this.state.listContent
        const value = {content: data, id: nanoid(), accomplish: false, title: '梗句', addPeople: 'xsw'}
        const newList = [...List,value]
        this.setState({listContent: newList})
    }

    exChanges = (data)=>{
        this.setState({exchanges: data})
    }

    getInfos = (data,title,id,people)=>{
        if (data){
            const sureAlert = Object.assign(this.state.sureAlert,{content: data, showAlert: true, title: title, id: id, people: people})
            this.setState({sureAlert:sureAlert},()=>{
                console.log(this.state.sureAlert)
            })
        }else {
            const sureAlert = Object.assign(this.state.sureAlert,{showAlert: data})
            this.setState({sureAlert:sureAlert})
        }
    }

    alertRevise = (id,data,title,people)=>{
        if (data.trim()){
            const list = this.state.listContent.map((e)=>{
                if (e.id === id){
                    e.content = data
                    e.title = title
                    e.addPeople = people
                }
                return e
            })
            const sureAlert = Object.assign(this.state.sureAlert,{content: data, showAlert: true, id: id, title: title, people: people})
            this.setState({listContent: list,sureAlert:sureAlert})
        }else {
            const sureAlert = Object.assign(this.state.sureAlert,{showAlert: false})
            DeleteList(id,this)
            this.setState({sureAlert:sureAlert})
        }
    }

    DetailAdd = (data)=>{
        this.props.history.push({
            pathname: '/add_in_detail',
            state: {detail: data}
        })
    }

    render() {
        const list = this.state.listContent

        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header exChanges={this.exChanges}/>
                    {
                        this.state.listContent.length ?
                            <div>
                                <MainList listContent={list} getInfos={this.getInfos} contentCompile={this.contentCompile}/>
                                <Footer
                                    deleteAll={this.deleteAll}
                                    list={list} num={list.length}
                                    statistics={this.state.statistics}
                                    statisticsAll={this.state.statisticsAll}
                                    addSocial={this.addSocial}
                                    exchanges={this.state.exchanges}
                                    DetailAdd={this.DetailAdd}
                                />
                            </div> : <h3>请输入任务！</h3>
                    }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <ShowAlert sureAlert={this.state.sureAlert} alertRevise={this.alertRevise} getInfos={this.getInfos}/>
                <Switch>
                    <Route path='/add_in_detail' component={AddInDetail}/>
                    <Route path='/slideshow' component={SlideShow}/>
                    <Redirect to='/slideshow'/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)

connect(
    state => ({
        lists: state.myList
    }),
)(App)

