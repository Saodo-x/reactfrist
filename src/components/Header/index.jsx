import React from "react";
import './index.css'
import PubSub from 'pubsub-js'
import {connect} from "react-redux";
import {addList} from "../../redux/action/myList";

export default class Header extends React.Component {
    state = {
        inputTxt: '',
        exchanges: true,
        title: ''
    }
    myRef1 = null

    componentDidMount() {
        this.getAsycn = PubSub.subscribe('getA', (_, value)=>{
            const {data,title} = value
            const hhh = this.state.exchanges
            this.setState({inputTxt: data, title:title},()=>{
                console.log(this.state)
            })
            this.myRef1.focus()
            if (!this.myRef1.value){
                this.setState({exchanges: !hhh},()=>{
                    this.props.exChanges(this.state.exchanges)
                })
            }
        })
    }

    componentWillUnmount() {
        PubSub.clearAllSubscriptions()
    }

    changeTxt = (e)=>{
        const txt = e.target.value
        const content = this.state.inputTxt
        this.setState({inputTxt:txt})
        if (content){
            if (this.state.title === '梗句'){
                this.setState({title: '母鸡啊！'})
            }
        }else {
            this.setState({title: '任务'})
        }
    }

    addList = (e)=>{
        const data = this.state.inputTxt
        const title = this.state.title
       if (e.keyCode === 13){
           PubSub.publish('getTxt',{data,title})
           // this.props.addList(this.state.inputTxt)
           this.setState({inputTxt:'',title: ''},()=>{
               if (!this.state.exchanges){
                   this.setState({exchanges: !this.state.exchanges},()=>{
                       this.props.exChanges(this.state.exchanges)
                   })
               }
           })
       }
       if (this.state.inputTxt){
           if (!e.target.value){
               this.setState({exchanges: !this.state.exchanges, title: ''},()=>{
                   this.props.exChanges(this.state.exchanges)
               })
           }
       }
    }

    render() {
        return (
            <div className="todo-header">
                <input
                    ref={c => this.myRef1 = c}
                    value={this.state.inputTxt}
                    type="text"
                    onChange={this.changeTxt}
                    onKeyUp={this.addList}
                    placeholder="请输入你的任务名称，按回车键确认"
                />
            </div>
        )
    }
}

connect(
    state => ({
        lists: state.myList
    }),
    {
        addList,
    }
)(Header)