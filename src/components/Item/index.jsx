import React from "react";
import './index.css'
import PubSub from "pubsub-js";

export default class Item extends React.Component {
    myBut = null
    myLi = null

    show = ()=>{
        const myBut = this.myBut
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = "#f0f0f0"
        myBut.style.display = 'block'
    }

    disappear = ()=>{
        const myBut = this.myBut
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = ""
        myBut.style.display = 'none'
    }

    changeData = ()=>{
        const list = this.props.list
        const value = list.accomplish
        this.setState({checked:!value});
        list.accomplish = !value
        PubSub.publish('getNum', list)
    }

    getKey = ()=>{
        const {id} = this.props
        PubSub.publish('deleteList', id)
    }

    render() {
        const {list} = this.props

        return (
            <li ref={c => this.myLi = c} onMouseOver={this.show} onMouseOut={this.disappear}>
                <label>
                    <input onChange={this.changeData} checked={list.accomplish} type="checkbox"/>
                    <span>{list.content}</span>
                </label>
                <button ref={c => this.myBut = c} onClick={this.getKey} className="btn btn-danger" style={{display:'none'}}>删除</button>
            </li>
        )
    }
}