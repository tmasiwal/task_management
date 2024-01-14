
import { REGISTER_FAILURE,REGISTER_REQUEST,REGISTER_SUCCESS } from "./actionTypes";


const initialState={
    isLoding: false,
    isError: false,
    isRegisterSuccess: false,
}
export const registerReducer = (state=initialState,action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        {
            return {...state,isLoding:true}
        }
        case REGISTER_SUCCESS:
        {
            return {...state,isLoding:false,isRegisterSuccess:true}
        }
        case REGISTER_FAILURE:{
            return {...state,isLoding:false,isError:true}
        }
  
  default:
return state;  }
}