import React, { useState } from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import welcome from "../../public/welcome.jpg";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Add more password complexity checks if needed
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      alert(
        "Password must be 8 characters, have at least one uppercase letter, and one special character (!@#$%^&*)"
      );
      return;
    }

    let user = {
      username,
      email,
      password,
    };

    dispatch(signup(user)).then((res) => {
      if (res) {
        navigate("/login");
      } else {
        alert("Signup failed. Please try again with valid credentials.");
      }
    });
  };

  return (
    <div className="lg:flex justify-center items-center h-screen  ">
      <div className="lg:w-1/2 xl:max-w-screen-sm  ">
        <div className=" bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center"></div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
            Sign in
          </h2>
          <div className="mt-12">
            <form onSubmit={(e) => handleSignup(e)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide flex justify-between items-center">
                  Username
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide flex justify-between items-center">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  placeholder="tanuj@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Confirm Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mt-10">
                <input
                  type="submit"
                  value="Sign in"
                  className="bg-cyan-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg"
                />
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account?
              <a
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-cyan-500 flex-1 h-screen ">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <img
            className="w-full h-full object-cover"
            src={welcome}
            alt="welcome image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
