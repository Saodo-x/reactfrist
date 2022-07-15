import {connect} from "react-redux";
import React from "react";
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from "../../redux/action/count";

class Count extends React.Component {
    increment = ()=>{
        const {value} = this.selectNumber
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
        return (
            <div>
                <h1>和为：{this.props.count}</h1>
                <h2>人数是：{this.props.personList.length}</h2>
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

export default connect(
    state => ({
        personList:state.rens,
        count: state.hes
    }),
    {
        jia:createIncrementAction,
        jian:createDecrementAction,
        jiaAsync:createIncrementAsyncAction
    }
)(Count)

// function mapStateToProps(state){
//     return {
//         count: state
//     }
// }

// function mapDispatchToProps(dispatch){
//     return {
//         jia:num => dispatch(createIncrementAction(num)),
//         jian:num => dispatch(createDecrementAction(num)),
//         jiaAsync:(num,time) =>dispatch(createIncrementAsyncAction(num,time)),
//     }
//
// }