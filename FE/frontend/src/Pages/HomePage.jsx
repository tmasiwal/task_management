import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TASK_REQUEST, TASK_SUCCESS } from "../Redux/actionTypes";

const HomePage = () => {
  const taskData=useSelector((store)=>store.taskReducer.tasks)
  const token = useSelector((store) => store.authReducer.accesstoken);
const dispatch =useDispatch()
  const getTaskData = () => {
    dispatch({type:TASK_REQUEST})
    axios({
      method: "get",
      url: "http://localhost:8080/tasks/",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => dispatch({ type: TASK_SUCCESS, payload: res.data.Task }))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTaskData();
  }, []);
const handleAddTask = () =>{
  
}
  return (
    <div>
      <Navbar />
      <button className="bg-cyan-500  p-4  rounded-lg tracking-wide font-semibold font-display text-white text-lg font-semiboldfocus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg">
        Add Task
      </button>
      <div className="grid grid-cols-5 gap-4  m-5 ">
        {taskData?.map((task) => (
          <div
            key={task._id}
            className="shadow-400 p-4 mb-4 rounded-md bg-white flex flex-col items-center justify-center truncate"
          >
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
