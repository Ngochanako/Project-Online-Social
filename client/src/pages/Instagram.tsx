
import React, { useEffect, useState } from 'react';
import { State, User } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLogin, resetUserLogin } from '../services/userLogin.service';
import Posts from './Posts';
import axios from 'axios';
export default function Instagram() {
    const userOnline:User=useSelector((state:State)=>state.userLogin)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    //load Page when user is not login or login
    useEffect(()=>{
       dispatch(getUserLogin())
       axios.get("http://localhost:3000/userLogin")
       .then(response=>{
          if(response.data.id!==''){
          }else{
            navigate('/login')           
          }
       })
       .catch(err=>console.log(err))
    },[])
  return (
    <div className='flex ml-[260px]'>
          {/* Posts start */}
      <Posts/>
      {/* Posts end */}
      {/* User start */}
      <section className='p-[20px] w-[30%] font-bold'>
         <div className='flex flex-col gap-[20px] '>
          <div className='flex justify-between'>
               <div className='flex items-center'>
                   <img className='w-[50px] h-[50px] rounded-[50%]' src={userOnline.avatar} alt="" />
                    <p className=''>{userOnline.username}</p>
               </div>
               <a className='text-orange-600 text-[14px]'>Chuyển</a>
          </div>
          <div className='flex justify-between'>
               <p className='text-gray-500 font-bold'>Gợi ý cho bạn</p>
               <a className='text-orange-600 text-[14px]'>Xem tất cả</a>
          </div>
          <div className='flex justify-between'>
               <div className='flex items-center'>
                   <img className='w-[50px] h-[50px] rounded-[50%]' src='https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-1.jpg' alt="" />
                   <div>
                      <p className=''>Komi</p>
                      <p className='text-gray-400 text-[14px] font-normal'> Gợi ý cho bạn</p>
                   </div>
               </div>
               <a className='text-orange-600 text-[14px]'>Theo dõi</a>
          </div>
         </div>
      </section>
      {/* User end */}
      </div>
  )
}
