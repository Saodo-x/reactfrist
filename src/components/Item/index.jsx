import React from "react";
import './index.css'
import PubSub from "pubsub-js";

export default class Item extends React.Component {
    state = {
        compile: false,
        value: this.props.list.content,
        show: 0
    }

    myBut1 = null
    myBut2 = null
    myLi = null
    myInput = null

    show = ()=>{
        const myBut1 = this.myBut1
        const myBut2 = this.myBut2
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = "#f0f0f0"
        myBut1.style.display = 'block'
        this.setState({show: 1})
        if (!this.state.compile){
            myBut2.style.display = 'block'
        }
    }

    disappear = ()=>{
        const myBut1 = this.myBut1
        const myBut2 = this.myBut2
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = ""
        myBut1.style.display = 'none'
        this.setState({show: 0})
        if (!this.state.compile){
            myBut2.style.display = 'none'
        }
    }

    changeData = ()=>{
        const list = this.props.list
        const value = list.accomplish
        this.setState({checked:!value});
        list.accomplish = !value
        PubSub.publish('getNum', list)
    }

    changeText = (e)=>{
        const content = e.target.value
        this.setState({value: content})
    }

    changeCont = (e)=>{
        if (e.keyCode === 13){
            const {list} = this.props
            list.content = e.target.value
            this.props.contentCompile(list)
            this.setState({compile: false},()=>{
                if (this.state.show){
                    this.myBut2.style.display = 'block'
                }
            })
        }
    }

    changeCont2 = (e)=>{
        const {list} = this.props
        list.content = e.target.value
        this.props.contentCompile(list)
        this.setState({compile: false},()=>{
            if (this.state.show){
                this.myBut2.style.display = 'block'
            }
        })
    }

    getKey = ()=>{
        const {id} = this.props
        PubSub.publish('deleteList', id)
    }

    revise = ()=>{
        const compile = this.state.compile
        this.setState({compile: !compile})
        this.setState({},()=>{
            this.myInput.focus()
        })
        this.myBut2.style.display = 'none'
    }

    render() {
        const {list} = this.props

        return (
            <li ref={c => this.myLi = c} onMouseOver={this.show} onMouseOut={this.disappear}>
                <label>
                    <input onChange={this.changeData} checked={list.accomplish} type="checkbox"/>
                    {
                        this.state.compile ? <input
                            ref={c => this.myInput = c}
                            type='text'
                            onKeyUp={this.changeCont}
                            onChange={this.changeText}
                            onBlur={this.changeCont2}
                            value={this.state.value}
                            />
                            : <span>{list.content}</span>
                    }
                </label>
                <button ref={c => this.myBut1 = c} onClick={this.getKey} className="btn btn-danger" style={{display:'none'}}>删除</button>
                &nbsp;&nbsp;
                <button
                    ref={c => this.myBut2 = c}
                    onClick={this.revise}
                    className="btn btn-danger"
                    style={{display:'none',background:'#66ccff',borderColor:'#66ccff'}}
                >修改</button>
            </li>
        )
    }
}