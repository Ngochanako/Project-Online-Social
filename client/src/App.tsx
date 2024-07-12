
import React from 'react'
import Home from './pages/Client/Home'
import Register from './pages/Client/Register'
import Login from './pages/Client/Login'
import { Route, Routes } from 'react-router-dom'
import Instagram from './components/Instagram'
import PersonalPage from './pages/Client/PersonalPage'
import Edit from './pages/Client/Edit'
import User from './pages/Client/User'
import PreLogin from './pages/Client/PreLogin'
import AdminPage from './pages/Admin/Admin'
import ManageUsers from './pages/Admin/ManageUsers'
import ManagePosts from './pages/Admin/ManagePosts'
import Group from './pages/Client/GroupUser'
import ManageGroups from './pages/Admin/ManageGroups'
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
          <Route path='manageGroups' element={<ManageGroups/>}/>
          <Route path='managePosts' element={<ManagePosts/>}/>
      </Route>
    </Routes>
  )
}
