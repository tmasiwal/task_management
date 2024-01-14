import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { deleteDataFromLocalStorage, getDataFormLocalStorage } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/action";

const Navbar = () => {
    const navigate=useNavigate();
    const isAuth = useSelector((store)=>store.authReducer.isAuth)
const dispatch =useDispatch()
    const handleLogout=()=>{
      dispatch(Logout());

    }

  return (
    <div className="h-16 w-full flex items-center justify-between bg-gray-800 p-4 shadow-md">
      <h1 className="text-white text-lg font-semibold">Logo</h1>
      {!isAuth && (
        <button className="bg-cyan-500  p-4  rounded-lg tracking-wide font-semibold font-display text-white text-lg font-semiboldfocus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg">
          Login
        </button>
      )}
      {isAuth && (
        <button className="bg-cyan-500  p-4  rounded-lg tracking-wide font-semibold font-display text-white text-lg font-semiboldfocus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg"
        onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
