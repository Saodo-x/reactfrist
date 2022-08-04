import React from "react";
import {addAsync} from "../../js/getTxt";
import './index.css'
import PubSub from "pubsub-js";
import {connect} from "react-redux";
import {addListAsync, changeAllAcc, deleteTrue} from "../../redux/action/myList";

export default class Footer extends React.Component {
    state = {
        detail: true,
    }

    componentDidMount() {
        const {num,statistics} = this.props
        if (num === statistics){
            this.setState({checked: true})
        }

        this.Detail = PubSub.subscribe('detail',(_,data)=>{
            this.setState({detail:data})
        })
    }

    changeDataAll = ()=>{
        const value = this.props.statisticsAll
        // this.setState({checked:!value})
        console.log(value)
        PubSub.publish('changeStatistics',!value)
        // this.props.changeAllAcc(!value)
    }

    delete = ()=>{
        const list = this.props.list
        const lists = list.filter((item)=>{
            return item.accomplish ===  false
        })
        this.props.deleteAll(lists)
        // this.props.deleteTrue()
    }

    addA = async ()=>{
        const txt = await addAsync().then(r => r.data)
        this.props.addSocial(txt)
        // this.props.addListAsync()
    }

    getA = async ()=>{
        const data = await addAsync().then(r => r.data)
        const title = '梗句'
        PubSub.publish('getA', {data, title})
    }

    detailAdd = ()=>{
        const detail = this.state.detail
        this.props.DetailAdd(!detail)
        this.setState({detail: !detail})
    }


    render() {
        const {num,statistics,statisticsAll} = this.props
        return (
            <div className="todo-footer">
                <label>
                    <input onChange={this.changeDataAll} checked={statisticsAll} type="checkbox"/>
                </label>
                <span><span>已完成{statistics}</span> / 全部{num}</span>
                {this.state.detail ? <button className="btn btn-danger" onClick={this.detailAdd}>详细添加</button> : null}
                <button className="btn btn-danger" onClick={this.addA}>直接加梗</button>
                <button className="btn btn-danger" onClick={this.getA}>{this.props.exchanges ? '先看看梗':'再换个梗'}</button>
                <button onClick={this.delete} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}

connect(
    state => ({
        lists: state.myList
    }),
    {
        deleteTrue,
        changeAllAcc,
        addListAsync
    }
)(Footer)