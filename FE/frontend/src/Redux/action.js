
import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";
const baseUrl = "http://localhost:8080";

// Login

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await axios.post(`${baseUrl}/users/login`, user);
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res?.data });

      return res?.data?.tokens.accesstoken;
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
    }
  } catch (error) {
    console.log(error);
  }
};
//Logout
export const Logout = () => async (dispatch)=>{
  dispatch({type: LOGOUT_SUCCESS});
  
}

// Register
export const signup = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const res = await axios.post(`${baseUrl}/users/register`, user);
      console.log(res.data);
      dispatch({ type: REGISTER_SUCCESS});

      return res
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE });
    }
  } catch (error) {
    console.log(error);
  }
};
