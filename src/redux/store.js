import {legacy_createStore as createStore,applyMiddleware,combineReducers} from "redux";
import countReducer from './reducer/count'
import personReducer from "./reducer/person";
import thunk from "redux-thunk";

const allReducer = combineReducers({
    hes:countReducer,
    rens:personReducer
})

export default createStore(allReducer,applyMiddleware(thunk))