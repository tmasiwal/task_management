import React, { useState } from "react";
import "../index.css";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TASK_REQUEST, TASK_SUCCESS } from "../Redux/actionTypes";
const TaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
const token = useSelector((store) => store.authReducer.accesstoken);
console.log(token);
const handleAddTask = (e) => {
  e.preventDefault();

  const data = {
    title: title, 
    description: description, 
  };

  dispatch({ type: TASK_REQUEST });

  axios({
    method: "POST",
    url: "http://localhost:8080/tasks/add",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      dispatch({ type: TASK_SUCCESS, payload: res.data.Task });
      navigate("/");
    })
    .catch((error) => console.error(error));
};
  return (
    <div className="w-1/2  shadow-400 m-auto mt-20 py-10 flex flex-col justify-center items-center">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <div className="mt-20">
            <form onSubmit={(e) =>handleAddTask(e)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide flex justify-between items-cente">
                  Title
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300  focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Enter Task title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Description
                  </div>
                </div>
                <textarea
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-10 ">
                <input
                  type="submit"
                  value="ADD TASK"
                  className="bg-cyan-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
