import {nanoid} from "nanoid";


const initState = [
    {content: '睡觉', id: nanoid(), accomplish: true},
    {content: '吃饭', id: nanoid(), accomplish: false},
    {content: '学习', id: nanoid(), accomplish: false}
]
export default function myListReducer (perState = initState,action){
    const {type,data} = action
    switch (type){
        case 'sss':
            return
        case 'aaa':
            return
        default:
            return perState
    }
}