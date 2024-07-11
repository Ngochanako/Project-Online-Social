
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { activeModalAllComment, activeModalAvatar, activeModalPost } from '../../store/reducers/ModalReducer';
import { Post, State, User } from '../../interfaces';
import { getUserLogin } from '../../services/userLogin.service';
import { getUsers } from '../../services/users.service';
import { getPosts } from '../../services/posts.service';
import { setPost } from '../../store/reducers/PostReducer';
export default function PersonalPage() {
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const users:User[]=useSelector((state:State)=>state.users);
    const posts=useSelector((state:State)=>state.posts);
    const [postsByUserOnline,setPostsByUserOnline]=useState<Post[]>([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    //load Page when user is not login or login
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
      dispatch(getUserLogin())
      dispatch(getUsers());
    },[])
    useEffect(()=>{
      dispatch(getPosts());
    },[])
    //get posts by UserOnline
    
    useEffect(()=>{
      let newPosts:Post[]=[];
      const postsById=userOnline.postsById;     
      for(let btn of postsById){
        let newPost:Post|undefined=posts.find(item=>item.id===btn)
        if(newPost){  
           newPosts.push(newPost)
         }
      }  
      setPostsByUserOnline(newPosts)   ;   
    },[posts,userOnline])      
    // open modal change Avatar
    const openModalAvatar=()=>{
      dispatch(activeModalAvatar());
    }
    //open Modal Post
    const openModalPost=(idPost:string)=>{
        axios.get(`http://localhost:3000/posts?id=${idPost}`)
        .then(response=>dispatch(setPost(response.data[0])))
        .then(()=>dispatch(activeModalAllComment()))
        .catch(err=>console.log(err))
    }
  return (

    <div className='p-[50px] ml-[230px]'>
      
        <header className='px-[40px] flex gap-[80px] items-center'>
            <img onClick={openModalAvatar} className='cursor-pointer w-[150px] h-[150px] rounded-[50%]' src={userOnline.avatar} alt="" />
            <div className='flex flex-col gap-[30px]'>
                <div className='flex gap-[20px] items-center'>
                    <div className='text-[20px]'>{userOnline.username}</div>
                  <Link to={'edit'}> <Button className='opacity-40 text-[14px]' variant="dark">Chỉnh sửa trang cá nhân</Button></Link> 
                    <Button className='opacity-40 text-[14px]' variant="dark">Xem kho lưu trữ</Button>
                </div>
                <div className='flex gap-[40px]'>
                    <div><span className='font-bold'>{userOnline.postsById.length}</span> bài viết</div>
                    <div><span className='font-bold'>{userOnline.followersById.length}</span> người theo dõi</div> 
                    <div>Đang theo dõi <span className='font-bold'>{users.filter(btn=>btn.followersById.includes(userOnline.id)).length}</span> người dùng</div>              
                </div>
            </div>
        </header>
        {/* Header end */}
        <div className='mt-[40px] ml-[20px] mb-[40px]'>
            <i className='bx bx-plus bx-border-circle text-[55px] bg-[rgb(250,250,250)] text-[rgb(199,199,199)] border-1'></i>
            <p className='text-[14px] ml-[25px] font-bold'>Mới</p>
        </div>
        <div className='w-[100%]' style={{border:"1px solid rgb(239,239,239)"}}></div>
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
       <div className='grid grid-cols-3 gap-[5px]'>
         {postsByUserOnline.sort((a,b)=>b.date-a.date).map((post:Post)=>(
            <img key={post.id} onClick={()=>openModalPost(post.id)} className='h-[300px] w-[300px] hover:opacity-85 cursor-pointer' src={post.images[0]} alt="" />
        ))}        
       </div>
      {/* Post end */}
    </div>
  )
}
