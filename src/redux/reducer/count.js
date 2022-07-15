import {INCREMENT,DECREMENT} from "../constant";

export default function countReducer (preState,action){
    if (preState === undefined) preState = 0
    const {type,data} = action
    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT:
            return preState - data
        default:
            return preState
    }
}