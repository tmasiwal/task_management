import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TASK_REQUEST, TASK_SUCCESS } from "../Redux/actionTypes";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const taskData=useSelector((store)=>store.taskReducer.tasks)
  const token = useSelector((store) => store.authReducer.accesstoken);
const dispatch =useDispatch()
const navigate=useNavigate()
  const getTaskData = () => {
    dispatch({type:TASK_REQUEST})
    axios({
      method: "get",
      url: "https://ill-gray-turkey-hat.cyclic.app/tasks/",
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
navigate("/task")
}
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen">
      <Navbar />
      <button
        className="bg-cyan-500  p-4  rounded-lg tracking-wide font-semibold font-display text-white text-lg font-semiboldfocus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg mt-2 ml-2"
        onClick={handleAddTask}
        style={{ marginRight: "-10px" }}
      >
        Add Task
      </button>
      <div className="grid grid-cols-5 gap-4  m-5 ">
        {taskData?.map((task) => (
          <Link key={task._id} to={`/task/${task._id}`}>
            <div className="shadow-400 p-4 mb-4 rounded-md bg-white flex flex-col items-center justify-center truncate">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
