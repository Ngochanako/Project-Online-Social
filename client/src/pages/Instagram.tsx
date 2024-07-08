
import React, { useEffect, useState } from 'react';
import { State, User } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLogin, resetUserLogin, setUserLogin, updateFollowersUserLogin } from '../services/userLogin.service';
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
      followUsersById:[],
      status:true,
    });
   // get Users from API
    useEffect(()=>{
      dispatch(getUsers())
    },[])
    //get usersUnFollow
    useEffect(()=>{
      const newUsers = users.filter(btn =>btn.id!==userOnline.id&& !userOnline.followUsersById.includes(btn.id));
      
      setUsersUnFollow(newUsers);
      
      
    },[users,userOnline])
    
    
    //load Page when user is not login or login
    useEffect(()=>{
       dispatch(getUserLogin())
       axios.get("http://localhost:3000/userLogin")
       .then(response=>{
          if(response.data.id!==''){
            setUser(response.data)
          }else{
            navigate('/login')           
          }
       })
       .catch(err=>console.log(err))
    },[])
    // follow User
    const followUser=(id:string)=>{
        const newUser={
         ...userOnline,
         followersById:[...userOnline.followUsersById,id]
        }
        setUser(newUser)
        dispatch(updateFollowersUser(newUser));
        dispatch(updateFollowersUserLogin(newUser));
        dispatch(setUserLogin(newUser));
        const userFollowed=users.find(btn=>btn.id===id);
        if(userFollowed){
           const userFollowedNew={
            ...userFollowed,
            followersById:[...userFollowed.followersById,userOnline.id]
           
           }
           dispatch(updateFollowersUser(userFollowedNew))
        }
    }
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
          <div className='flex flex-col gap-[10px]'>
              {usersUnFolow.map(btn=>(
                 <div key={btn.id} className='flex justify-between items-center'>
                 <div className='flex items-center'>
                     <img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatar} alt="" />
                     <div>
                        <p className=''>{btn.username}</p>
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
