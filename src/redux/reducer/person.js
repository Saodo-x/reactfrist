import {ADD_PERSON} from "../constant";

const initState = JSON.parse(localStorage.getItem("Name"))
export default function personReducer(preState = initState,action){
    const {type,data} = action
    switch (type) {
        case ADD_PERSON:
            localStorage.setItem('Name',JSON.stringify([data,...preState]))
            return  [data,...preState]
        default:
            return preState
    }
}