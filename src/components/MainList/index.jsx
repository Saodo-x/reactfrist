import React from "react";
import {nanoid } from 'nanoid';
import './index.css'

function ListItems (props){
    return (
        <div>
            <div>
                <input type='checkbox'/>
                {props.value}
            </div>
        </div>
    )
}

function NumList (props){
    const lists = props.lists
    return (
        <div>
            {
                lists.map((item)=>
                    <ListItems key={item.listId} value={item.value}/>
                )
            }
        </div>
    )
}

function Footer (){
    return (
        <div>
            <input type='checkbox'/>
        </div>
    )
}

class MainList extends React.Component {
    state = {
        lists: [
            {value: 'sss', listId: '1'},
            {value: 'hhh', listId: '2'},
            {value: 'aaa', listId: '3'},
        ],
        valueList: '',
    }

    txtChange = ()=>{
        // console.log(event.target.value)
        const {input} = this
        this.setState({valueList:input.value})
    }

    addList = ()=>{
        const value = {value:this.state.valueList,listId:nanoid()}
        const list = this.state.lists
        list.push(value)
        this.setState({lists:list})
    }

    render() {
        const {lists} = this.state
        return (
            <div className='main'>
                <input ref={c => this.input = c} type='text' name='valueList' onChange={this.txtChange}/>
                <button onClick={this.addList}>ssss</button>
                <NumList lists={lists}/>
                <Footer/>
            </div>
        )
    }
}

export default MainList