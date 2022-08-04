import {nanoid} from "nanoid";
import {ADD_LIST, DELETE_LIST, DELETE_TRUE, CHANGE_ACC, CHANGE_ALL_ACC} from "../constant";

const initState = [
    {content: '睡觉', id: nanoid(), accomplish: true},
    {content: '吃饭', id: nanoid(), accomplish: false},
    {content: '学习', id: nanoid(), accomplish: false}
]
export default function myListReducer (perState = initState,action){
    const {type,data} = action
    switch (type){
        case 'ADD_LIST':
            return [...perState, data]
        case 'DELETE_LIST':
            const indexList = perState.findIndex((item)=>{
                return item.id === data
            })
            return [...perState.splice(indexList,1)]
        case 'DELETE_TRUE':
            perState = perState.filter((item)=>{
                return item.accomplish ===  false
            })
            return perState
        case 'CHANGE_ACC':
            perState = perState.map((n)=>{
                if (n.id === data.id) {
                    n.accomplish = data.accomplish
                    return n
                }
                return n
            })
            return perState
        case 'CHANGE_ALL_ACC':
            perState = perState.map((n)=>{
                n.accomplish = data
                return n
            })
            return perState
        default:
            return perState
    }
}