import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Post, State } from '../interfaces';
import type { User } from '../interfaces';
import axios from 'axios';
import { getUserLogin } from '../services/userLogin.service';
import { getUsers, updateUser } from '../services/users.service';
import { getPosts } from '../services/posts.service';
import { setPost } from '../store/reducers/PostReducer';
import { activeModalAllComment } from '../store/reducers/ModalReducer';
export default function User() {
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userOnline=useSelector((state:State)=>state.userLogin);

    const users=useSelector((state:State)=>state.users);
    const posts=useSelector((state:State)=>state.posts);
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
      private:false,
      requestFollowById:[]
    });
    const [postsByUser,setPostsByUser]=useState<Post[]>([]);
    useEffect(()=>{ 
      axios.get("http://localhost:3000/userLogin")
    .then(response=>{
        if(response.data.id!==''){      
        }else{
            navigate('/preLogin')           
        }
        })
    .catch(err=>console.log(err))
    },[])    
    useEffect(()=>{
      dispatch(getUserLogin());
      dispatch(getUsers());
      dispatch(getPosts());
    },[])
  useEffect(()=>{
     const newUser=users.find(btn=>btn.id===id);
     
     if(newUser){setUser(newUser)}
    
  },[users])
  useEffect(()=>{
    const newPosts=posts.filter(btn=>user.postsById.includes(btn.id));
    setPostsByUser(newPosts); 
  },[posts,user])
  //return Status fOLLOW
  const returnStatusFollow=()=>{
     if(user.followersById.includes(userOnline.id)){
      return "Hủy theo dõi"
     }
     if(user.requestFollowById.includes(userOnline.id)){
      return "Hủy gửi yêu cầu theo dõi"
     }
     return "Theo dõi"
  }
  //open Modal Post
  const openModalPost=(idPost:string)=>{
    axios.get(`http://localhost:3000/posts?id=${idPost}`)
    .then(response=>dispatch(setPost(response.data[0])))
    .then(()=>dispatch(activeModalAllComment()))
    .catch(err=>console.log(err))
  }
  //handleFollow
  const handleFollow=()=>{
    
    if(user.followersById.includes(userOnline.id)){
      
       let newUser={
        ...user,
        followersById:user.followersById.filter(btn=>btn!==userOnline.id)
       }
       dispatch(updateUser(newUser));
       
    }else if(!user.requestFollowById.includes(userOnline.id)){
      let newUser={
        ...user,
        requestFollowById:[...user.requestFollowById,userOnline.id]
      }
      
      dispatch(updateUser({...newUser}))     
    }else{
      let newUser={
        ...user,
        requestFollowById:user.requestFollowById.filter(btn=>btn!==userOnline.id)
      }
      
      dispatch(updateUser({...newUser})) 
    }
  }
  return (
    <div className='p-[50px] ml-[230px]'>
      
        <header className='px-[40px] flex gap-[80px] items-center'>
            <img className='cursor-pointer w-[150px] h-[150px] rounded-[50%]' src={user.avatar} alt="" />
            <div className='flex flex-col gap-[30px]'>
                <div className='flex gap-[20px] items-center'>
                    <div className='text-[20px]'>{user.username}</div>
                    <div onClick={handleFollow} className='bg-[rgb(239,239,239)] cursor-pointer rounded-[5px] text-orange-500 px-[10px] py-[5px]'>{returnStatusFollow()}</div>
                </div>
                <div className='flex gap-[40px]'>
                    <div><span className='font-bold'>{user.postsById.length}</span> bài viết</div>
                    <div><span className='font-bold'>{user.followersById.length}</span> người theo dõi</div> 
                    <div>Đang theo dõi <span className='font-bold'>{users.filter(btn=>btn.followersById.includes(user.id)).length}</span> người dùng</div>              
                </div>
            </div>
        </header>
        {/* Header end */}
        <div className='mt-[40px] ml-[20px] mb-[40px]'>
            <i className='bx bx-plus bx-border-circle text-[55px] bg-[rgb(250,250,250)] text-[rgb(199,199,199)] border-1'></i>
            <p className='text-[14px] ml-[25px] font-bold'>Mới</p>
        </div>
        <hr className='' />
        <div className='my-[20px] flex justify-center gap-[50px]'>
            <div className='flex items-center gap-[10px]  text-black cursor-pointer'>
            <i className='bx bx-menu bx-border'></i>
            <div className='uppercase'>Bài viết</div>
            </div>
            <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
            <i className='bx bx-home-alt-2'></i>
            <div className='uppercase'>Đã lưu</div>
            </div>
            <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
            <i className='bx bx-user bx-border' ></i>
            <div className='uppercase'>Được gắn thẻ</div>
            </div>
        </div>
      {/* Post start */}
      {user.private&&!user.followersById.includes(userOnline.id)?(
         <div className='flex flex-col items-center justify-center gap-[20px]'>
              <p className='font-bold text-[16px]'>Người dùng đã cài đặt  riêng tư</p>
              <p className='text-orange-500'>Bạn có muốn theo dõi tài khoản này để xem bài viết?</p>
         </div> 
      ):(
        <div className='grid grid-cols-3 gap-[5px]'>
        {postsByUser.sort((a,b)=>b.date-a.date).map((post:Post)=>(
           <img key={post.id} onClick={()=>openModalPost(post.id)} className='h-[300px] w-[300px] hover:opacity-85 cursor-pointer' src={post.images[0]} alt="" />
       ))}        
      </div>
      )}
       
      {/* Post end */}
    </div>
  )
}
