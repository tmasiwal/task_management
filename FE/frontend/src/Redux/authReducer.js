import {
  deleteDataFromLocalStorage,
  getDataFormLocalStorage,
  setDataToLocalStorage,
} from "../utils/localStorage";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isAuth: getDataFormLocalStorage("auth")?.isAuth || false,
  user: getDataFormLocalStorage("auth")?.username || false,
  userId: getDataFormLocalStorage("auth")?.userId || "",
  isError: false,
  accesstoken: getDataFormLocalStorage("auth")?.accesstoken ||"",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case LOGIN_SUCCESS:
      if (action.payload?.tokens.accesstoken) {
        let User = {
          isAuth: true,
          username: action.payload.username,
          userId: action.payload.userId,
          accesstoken: action.payload.tokens.accesstoken,
        };
        setDataToLocalStorage("auth", User);
        return {
          ...state,
          isLoading: false,
          isAuth: getDataFormLocalStorage("auth")?.isAuth,
          user: getDataFormLocalStorage("auth")?.username,
          userId: getDataFormLocalStorage("auth")?.userId,
        };
      } else {
        return { ...state, isLoading: false, isAuth: false };
      }

    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case LOGOUT_SUCCESS: {

      deleteDataFromLocalStorage("auth");
      return {
        initialState
      };
    }
    default:
    return state;
  }
};
