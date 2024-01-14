import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./authReducer";

const rootReducer=combineReducers(authReducer)

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

