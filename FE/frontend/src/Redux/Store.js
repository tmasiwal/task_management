import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./authReducer";
import{registerReducer } from "./registerReducer"
import {taskReducer}from "./taskReducer"
const rootReducer = combineReducers({ authReducer,registerReducer,taskReducer });

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

