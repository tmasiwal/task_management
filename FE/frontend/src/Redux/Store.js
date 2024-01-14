import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import thunk from "redux-thunk";
import {authRed}


const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default Store;
