import React from "react";
import './index.css'
import PubSub from 'pubsub-js'

export default class Header extends React.Component {
    state = {
        inputTxt: ''
    }
    myRef1 = null

    changeTxt = ()=>{
        const txt = this.myRef1.value
        this.setState({inputTxt:txt})
    }

    addList = (event)=>{
       if (event.keyCode === 13){
           PubSub.publish('getTxt',this.state.inputTxt)
           this.setState({inputTxt:''})
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