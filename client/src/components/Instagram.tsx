
import React, { useEffect, useState } from 'react';
import { State, User } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {getUserLogin, setUserLogin, updateFollowersUserLogin } from '../services/userLogin.service';
import Posts from './Posts';
import axios from 'axios';
import { getUsers, updateFollowersUser } from '../services/users.service';
export default function Instagram() {
    const users:User[]=useSelector((state:State)=>state.users);
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [usersUnFolow,setUsersUnFollow]=useState<User[]>([]);
    useEffect(()=>{ 
      axios.get(`http://localhost:3000/users/${userOnline.id}`)
    .then(response=>{
        if(response.data.id==''||response.data.status==false){
           navigate('/preLogin')        
        }
        })
    .catch(err=>console.log(err))
    })
   // get Users from API
    useEffect(()=>{
      dispatch(getUsers());
    },[])
    //get usersUnFollow
    useEffect(()=>{
      const newUsers = users.filter(btn =>!btn.followersById.includes(userOnline.id)&&btn.id!==userOnline.id&&!btn.requestFollowById.includes(userOnline.id));  

      setUsersUnFollow(newUsers);     
    },[users,userOnline])
    // follow User
    const followUser=(btn:User)=>{
          if(btn.requestFollowById.includes(userOnline.id)){
            return;
          }
        //get User from users
          const newUser={
            ...btn,
            requestFollowById:[...btn.requestFollowById,userOnline.id]
           }
           setUsersUnFollow(usersUnFolow.map( btn=>btn.id==newUser.id?newUser:btn))
           dispatch(updateFollowersUser(newUser));
        }      
  return (
    <div className='flex ml-[230px]' >
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
          <div className='flex flex-col gap-[10px]'>
              {usersUnFolow.map(btn=>(
                 <div key={btn.id} className='flex justify-between items-center'>
                 <div className='flex items-center'>
                    <Link to={`/user/${btn.id}`}><img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatar} alt="" /></Link> 
                     <div>
                        <Link to={`/user/${btn.id}`}><p className=''>{btn.username}</p> </Link> 
                        <p className='text-gray-400 text-[14px] font-normal'> Gợi ý cho bạn</p>
                     </div>
                 </div>
                 <a onClick={()=>followUser(btn)} className='text-orange-600 text-[14px] cursor-pointer'>{btn.requestFollowById.includes(userOnline.id)?"Đã gửi yêu cầu theo dõi":'Theo dõi'}</a>
            </div>
              ))}
          </div>
         </div>
      </section>
      {/* User end */}
      </div>
  )
}
