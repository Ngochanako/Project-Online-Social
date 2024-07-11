
import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Instagram from './components/Instagram'
import PersonalPage from './pages/PersonalPage'
import Edit from './pages/Edit'
import User from './pages/User'
import PreLogin from './pages/PreLogin'
import AdminPage from './pages/Admin'
import ManageUsers from './pages/ManageUsers'
import ManageComments from './pages/ManageComments'
import ManagePosts from './pages/ManagePosts'
import Group from './pages/GroupUser'
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index element={<Instagram/>}/>
        <Route path='personal' element={<PersonalPage/>}>          
        </Route>
        <Route path='personal/edit' element={<Edit/>}/>
        <Route path='user/:id' element={<User/>}/>
        <Route path='group' element={<Group/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/preLogin' element={<PreLogin/>}/>
      <Route path='/admin' element={<AdminPage/>}>
          <Route index element={<ManageUsers/>}/>
          <Route path='manageComments' element={<ManageComments/>}/>
          <Route path='managePosts' element={<ManagePosts/>}/>
      </Route>
    </Routes>
  )
}
