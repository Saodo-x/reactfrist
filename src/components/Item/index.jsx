import React from "react";
import './index.css'
import PubSub from "pubsub-js";
import {connect} from "react-redux";
import {changeAcc, deleteList} from "../../redux/action/myList";
// import ShowAlert from "../showalert";

export default class Item extends React.Component {
    state = {
        compile: false,
        value: this.props.list.content,
        title: this.props.list.title,
        show: 0,
        sureAlert: {
            showAlert: '',
            title: '提示',
            content: "哈哈哈哈哈",
            btns: ""
        }
    }

    myBut1 = null
    myBut2 = null
    myBut3 = null
    myLi = null
    myInput = null

    componentDidMount() {
        this.setState({
            value: this.props.list ? this.props.list.content : '',
            title: this.props.list ? this.props.list.title : '',
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            value: nextProps.list.content,
            title: nextProps.list.title,
        })
    }

    show = ()=>{
        const myBut1 = this.myBut1
        const myBut2 = this.myBut2
        const myBut3 = this.myBut3
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = "#f0f0f0"
        myBut1.style.display = 'block'
        myBut3.style.display = 'block'
        this.setState({show: 1})
        if (!this.state.compile){
            myBut2.style.display = 'block'
        }
    }

    disappear = ()=>{
        const myBut1 = this.myBut1
        const myBut2 = this.myBut2
        const myBut3 = this.myBut3
        const myLi = this.myLi
        // console.log(myBut.style.display)
        myLi.style.background = ""
        myBut1.style.display = 'none'
        myBut3.style.display = 'none'
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
        // this.props.changeAcc(list)
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
        // this.props.deleteList(id)
    }

    revise = ()=>{
        const compile = this.state.compile
        this.setState({compile: !compile})
        this.setState({},()=>{
            this.myInput.focus()
        })
        this.myBut2.style.display = 'none'
    }

    detail = ()=>{
        const value = this.state.value
        const title = this.state.title
        const id = this.props.list.id
        const people = this.props.list.addPeople
        this.props.getInfos(value,title,id,people)
    }

    render() {
        const {list} = this.props

        return (
            <div>
                <li ref={c => this.myLi = c} onMouseOver={this.show} onMouseOut={this.disappear}>
                    <label style={{overflow:"hidden"}}>
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
                    <button
                        ref={c => this.myBut2 = c}
                        onClick={this.revise}
                        className="btn btn-danger"
                        style={{display:'none',background:'#66ccff',borderColor:'#66ccff'}}
                    >修改</button>
                    <button
                        ref={c => this.myBut3 = c}
                        onClick={this.detail}
                        className='btn btn-danger'
                        style={{display:'none',background:'#787878',borderColor:'#787878'}}
                    >详情</button>
                </li>
            </div>
        )
    }
}

connect(
    state => ({
        lists: state.myList
    }),
    {
        deleteList,
        changeAcc
    }
)(Item)