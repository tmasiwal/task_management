import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from './PrivateRoute'
import HomePage from './Pages/HomePage'
import TaskPage from './Pages/TaskPage'
import SignupPage from './Pages/SignupPage'
import SingleTaskPage from'./Pages/SingleTaskPage'
const Allroutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element ={<PrivateRoute>

        <HomePage/>
      </PrivateRoute>}/>
      <Route path='/task' element={<TaskPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/task/:id' element={<SingleTaskPage/>}/>
    </Routes>
  )
}

export default Allroutes
