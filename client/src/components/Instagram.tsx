
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
    const [user,setUser]=useState<User>({
      id:'',
      username:'',
      password:'',
      email:'',
      avatar:'',
      biography:'',
      gender:'',
      postsById:[],
      followersById:[],
      status:true,
      private:false
    });
   // get Users from API
    useEffect(()=>{
      dispatch(getUsers());
      axios.get("http://localhost:3000/userLogin")
    .then(response=>{
        if(response.data.id!==''){      
        }else{
            navigate('/preLogin')           
        }
        })
    .catch(err=>console.log(err))
    },[])
    //get usersUnFollow
    useEffect(()=>{
      const newUsers = users.filter(btn =>!btn.followersById.includes(userOnline.id)&&btn.id!==userOnline.id);      
      setUsersUnFollow(newUsers);     
    },[users,userOnline])
    // follow User
    const followUser=(id:string)=>{
        //get User from users
        const userFollow=users.find(btn=>btn.id===id);
        if(userFollow){
          const newUser={
            ...userFollow,
            followersById:[...userFollow.followersById,userOnline.id]
           }
           setUser(newUser);
           dispatch(updateFollowersUser(newUser));
            dispatch(updateFollowersUserLogin(newUser));
            dispatch(setUserLogin(newUser));
        }      
    }
  return (
    <div className='flex w-[100%]'>
          {/* Posts start */}
      <Posts/>
      {/* Posts end */}
      {/* User start */}
      <section className='p-[20px] w-[50%] font-bold'>
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
                 <a onClick={()=>followUser(btn.id)} className='text-orange-600 text-[14px] cursor-pointer'>{user.followersById.includes(btn.id)?"Đang theo dõi":'Theo dõi'}</a>
            </div>
              ))}
          </div>
         </div>
      </section>
      {/* User end */}
      </div>
  )
}
