import {legacy_createStore as createStore,applyMiddleware,combineReducers} from "redux";
import countReducer from './reducer/count'
import personReducer from "./reducer/person";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const allReducer = combineReducers({
    hes:countReducer,
    rens:personReducer
})

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))