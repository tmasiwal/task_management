import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TASK_REQUEST, TASK_SUCCESS } from "../Redux/actionTypes";
import React , { useEffect, useState } from "react";
const SingleTaskPage = () => {
  const { id } = useParams();
   const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskData, setTaskData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const token = useSelector((store) => store.authReducer.accesstoken);

const getTask=()=>{
  axios({
    method: "get",
    url: `https://ill-gray-turkey-hat.cyclic.app/tasks`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    
  })
    .then((res) => {
      const filteredTask = res.data.Task.filter((task) => task._id === id);
      if (filteredTask.length > 0) {
       
        setTaskData(filteredTask[0]);
      }})
    .catch((error) => console.error(error));
}
const handleDeleteTask = (e) => {
  e.preventDefault();

 

  dispatch({ type: TASK_REQUEST });

  axios({
    method: "DELETE",
    url: `https://ill-gray-turkey-hat.cyclic.app/tasks/${id}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch({ type: TASK_SUCCESS, payload: res.data.Task });
      navigate("/");
    })
    .catch((error) => console.error(error));
  }
  const handleEditTask = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
    };

    dispatch({ type: TASK_REQUEST });

    axios({
      method: "PATCH",
      url: `https://ill-gray-turkey-hat.cyclic.app/tasks/${id}`,
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
useEffect(()=>{
  getTask()
  
},[])
useEffect(() => {
 setTitle(taskData.title)
 setDescription(taskData.description)
}, [taskData]);
console.log(taskData)
  return (
    <div className="w-1/2  shadow-400 m-auto mt-20 py-10 flex flex-col justify-center items-center">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <div className="mt-20">
            <form >
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
            </form>
          </div>
        </div>
              <div className="mt-10 flex items-center justify-between ">
                <button className="bg-cyan-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg" onClick={handleEditTask}>
                  Edit Task
                </button>
                <button className="bg-cyan-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-cyan-600 shadow-lg" onClick={(e)=>handleDeleteTask(e)}>
                  DELETE
                </button>
              </div>
      </div>
    </div>
  );
};

export default SingleTaskPage;
