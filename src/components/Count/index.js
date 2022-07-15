import React from "react";
// import store from "../../redux/store";

export default class Count extends React.Component {
    state = {
        count: 0
    }

    increment = ()=>{
        const {value} = this.selectNumber
        // const {count} = this.state
        // this.setState({count: count+(value-0)})
        this.props.jia(value-0)
    }

    decrement = ()=>{
        const {value} = this.selectNumber
        this.props.jian(value-0)
    }

    addIfodd = ()=>{
        const {value} = this.selectNumber
        const count = this.props.count
        if (count%2 !== 0){
            this.props.jia(value-0)
        }
    }

    addAsync = ()=>{
        const {value} = this.selectNumber
        this.props.jiaAsync(value-0,500)
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <h1>和为：{this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.addIfodd}>奇数加</button>&nbsp;
                <button onClick={this.addAsync}>异步加</button>&nbsp;
            </div>
        )
    }
}