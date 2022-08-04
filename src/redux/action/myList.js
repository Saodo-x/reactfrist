import {ADD_LIST, DELETE_LIST, DELETE_TRUE, CHANGE_ACC, CHANGE_ALL_ACC} from "../constant";
import {addAsync} from "../../js/getTxt";
import {nanoid} from "nanoid";

export const addList = data => ({type: ADD_LIST, data})
export const deleteList = data => ({type: DELETE_LIST, data})
export const deleteTrue = () => ({type: DELETE_TRUE})
export const changeAcc = data => ({type: CHANGE_ACC, data})
export const changeAllAcc = data => ({type: CHANGE_ALL_ACC, data})
export const addListAsync = () => {
    return async (dispatch)=>{
        const txt = await addAsync().then(r=>r.data)
        const list = {content: txt, id: nanoid(), accomplish: false}
        dispatch(addList(list))
    }
}
