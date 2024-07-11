import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../interfaces';
import { getUserAdmin } from '../../services/userAdmin.service';
import { resetAdmin } from '../../services/userAdmin.service';
import axios from 'axios';
export default function AdminPage() {
  const [active,setActive]=useState<boolean>(false);
  const navigate=useNavigate();
  const userAdmin=useSelector((state:State)=>state.userAdmin);
  const dispatch=useDispatch();
  const [widthHeaderLeft,setWithHeaderLeft]=useState<string>('200px');
  const [hiddenHeader,setHiddenHeader]=useState<boolean>(true);
  useEffect(()=>{
    axios.get("http://localhost:3000/userAdmin")
    .then(response=>{
        if(response.data.id!=='a1'){
           navigate('/login')
        }
    })
    .catch(err=>console.log(err))
  },[userAdmin])
  //
  useEffect(()=>{
    getUserAdmin();
  },[])
  const handleActive=()=>{
    setActive(!active);
  }
  //handle Active Header
  const activeHeader=({isActive}:{isActive:boolean})=>{
     return{
        backgroundColor:isActive?'rgb(31,41,55)':'rgb(17,24,39)',
        color:isActive?'white':'rgb(156,163,175)'
     }
  }
  //handle Mouse header-left
  const handleMouseHeaderLeft=()=>{
      setWithHeaderLeft(widthHeaderLeft=='80px'?'200px':'80px');
      setHiddenHeader(hiddenHeader?false:true);
  } 
  //log out
  const logout=()=>{
     dispatch(resetAdmin());
    //  navigate('/login')
  }
  return (
    <div className=''>
      {/* Bắt đầu nav */}
        <nav className={`flex justify-between w-[100%] bg-[rgb(17,24,39)] text-[rgb(156,163,175)] py-2  px-[50px] font-bold`}>
          <ul className='flex gap-3'>
            <li className='flex gap-1 items-center p-[5px]'>
            <i className='bx bxs-home-alt-2'></i>
            <div>Home</div>
            </li>
          </ul>
          <ul className='flex items-center gap-[20px]'>
            <li className='bg-white rounded-xl p-1 text-black'>Admin</li>
            <li onClick={logout}><i className="fa-solid fa-right-from-bracket cursor-pointer"></i></li>
          </ul>
        </nav>
        {/* Kết thúc nav */}

       <div className='flex'>
          {/* Start Header-Left */}
          <header onMouseEnter={handleMouseHeaderLeft} className={` flex flex-col w-[${widthHeaderLeft}] py-[20px] bg-[rgb(17,24,39)] text-[rgb(156,163,175)]  rounded-r-[5px] transition-all duration-[500ms]`}>
              {/* <div className='flex gap-1 bg-white text-black p-1 m-[10px] rounded-[5px] items-center'>
              <i className='bx bx-plus'></i>
              <p>New Item</p>
              </div> */}
              <i onClick={handleMouseHeaderLeft} className='bx bx-menu text-[30px] ml-[20px] cursor-pointer hover:text-[rgb(31,41,55)]'></i>
              <NavLink to={'/admin'} style={activeHeader}>
              <div className='list-item-header-left'>
                <div className=' flex justify-between p-2 items-center'>
                    <div className='item-header-left active flex gap-3 items-center' >
                        <i className='bx bxs-user'></i>
                        {hiddenHeader&&<p>Users</p>}
                    </div>
                    <div onClick={handleActive} >{hiddenHeader&&<i className='bx bx-chevron-down bx-sm bx-fade-down-hover'></i>}</div>                          
                </div>
                {active && <div className=' text-white pl-[25px] flex flex-col gap-2'>
                    
                </div>}
              </div>
              </NavLink>
              
              <NavLink to={'/manageComments'} style={activeHeader}> 
              <div className='list-item-header-left flex justify-between p-2 items-center'>
                  <div className='item-header-left flex gap-3 items-center' >
                  <i className='bx bxs-chat'></i>                   
                  {hiddenHeader&&<p>Comments</p>}
                  </div>
                  <div>{hiddenHeader&&<i className='bx bx-chevron-down bx-sm bx-fade-down-hover'></i>}</div>
              </div>
              </NavLink>
              <NavLink to={'/managePosts'} style={activeHeader}> 
              <div className='list-item-header-left flex justify-between p-2 items-center'>
                  <div className=' item-header-left flex gap-3 items-center' >
                  <i className='bx bxs-book'></i>
                  {hiddenHeader&&<p>Posts</p>}
                  </div>
                  <div>{hiddenHeader&&<i className='bx bx-chevron-down bx-sm bx-fade-down-hover'></i>}</div>
              </div>
              </NavLink>
          </header>
          {/* Header-left end */}
          {/* Main start */}
         <Outlet/>
        </div> 
    </div>
  )
}
