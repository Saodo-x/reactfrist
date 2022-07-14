import React from "react";
import './index.css'
import PubSub from "pubsub-js";

export default class Footer extends React.Component {

    componentDidMount() {
        const {num,statistics} = this.props
        if (num === statistics){
            this.setState({checked: true})
        }
    }

    changeDataAll = ()=>{
        const value = this.props.statisticsAll
        // this.setState({checked:!value})
        console.log(value)
        PubSub.publish('changeStatistics',!value)
    }

    delete = ()=>{
        const lists = this.props.list.filter((item)=>{
            return item.accomplish ===  false
        })
        this.props.deleteAll(lists)
    }

    render() {
        const {num,statistics,statisticsAll} = this.props
        return (
            <div className="todo-footer">
                <label>
                    <input onChange={this.changeDataAll} checked={statisticsAll} type="checkbox"/>
                </label>
                <span><span>已完成{statistics}</span> / 全部{num}</span>
                <button onClick={this.delete} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}