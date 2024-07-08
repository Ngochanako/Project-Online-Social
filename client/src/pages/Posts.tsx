import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { User,Post } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../interfaces';
import { activeModalAllComment } from '../store/reducers/ModalReducer';
import { getPosts, updatePosts } from '../services/posts.service';
import { getUserLogin } from '../services/userLogin.service';
import { setPost } from '../store/reducers/PostReducer';
import { convertTime } from '../interfaces/convertTime';
export default function Posts() {
     //Initialization
     const postsLocal:Post[]=useSelector((state:State)=>state.posts);
     const userOnline:User=useSelector((state:State)=>state.userLogin);
     const dispatch=useDispatch();
     const [posts,setPosts]=useState<Post[]>([]);
     //get userOnline from API
     useEffect(()=>{
        dispatch(getUserLogin())
     },[])
     //get posts from API
     useEffect(()=>{
       dispatch(getPosts());
     },[])
     //set Posts from postsLocal
      useEffect(()=>{
        let newPostsFollowUsersSortByDateAsc=postsLocal.filter(btn=>userOnline.followUsersById.includes(btn.idUser)).sort((a,b)=>b.date-a.date);
        let newPostsUnFollowUsersSortByDateAsc=postsLocal.filter(btn=>!userOnline.followUsersById.includes(btn.idUser)).sort((a,b)=>b.date-a.date);
        let newPostsSortByDate=[...newPostsFollowUsersSortByDateAsc,...newPostsUnFollowUsersSortByDateAsc];
        setPosts(newPostsSortByDate);
      },[postsLocal,userOnline])
      
      //like or unlike Post
      const likePost=(idPost:string)=>{
        let postFind=posts.find(btn=>btn.id===idPost);
        if(postFind){
          if(postFind.favouristUsersById.includes(userOnline.id)){
            let newPost={
              ...postFind,
              favouristUsersById:postFind.favouristUsersById.filter(btn=>btn!==userOnline.id)
            }
            dispatch(updatePosts(newPost));
          } else{
            let newPost={
              ...postFind,
              favouristUsersById:[...postFind.favouristUsersById,userOnline.id]
            }
            dispatch(updatePosts(newPost));
          }
        }      
      }
     //open Modal All Comment
     const viewComments=(idPost:string)=>{
        dispatch(activeModalAllComment());
        let postView:Post|undefined=postsLocal.find(btn=>btn.id===idPost);
        if(postView){
          dispatch(setPost(postView));
        }
     }
     
  return (
    <div className='w-[70%]'>
      {/* Modal All Comment Start */}
     
      {/* Reel start */}
      {/* Reel end */}
      {/* Posts start */}
      <main className='px-[100px] py-[50px]'>
          <div className=''>
            <hr />
            {posts.map(btn=>(
              <div key={btn.id}>
                  {/* Title start */}
                <div className='flex justify-between mt-[20px] items-center'>
                  <div className='flex items-center gap-[7px]'>
                    <img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatarUser} alt="" />
                    <div className='font-bold'>{btn.userNameUser}</div>
                    <div className='w-[4px] h-[4px] rounded-[50%] bg-gray-500'></div>
                    <div className='text-gray-500 text-[14px]'>{convertTime((new Date().getTime()-btn.date)/60000)}</div>
                    <div className='w-[4px] h-[4px] rounded-[50%] bg-gray-500'></div>
                    {userOnline.followUsersById.includes(btn.idUser)&&<div className='text-[rgb(0,144,237)] font-[600] text-[14px]'>Theo dõi</div>}
                  </div>
                  <div className='flex gap-[3px]'>
                    <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
                    <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
                    <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
                  </div>
                </div>
                  {/* title end */}
                  {btn.images.length==1?(
                    <img className='d-block w-100 max-h-[400px] object-cover' src={btn.images[0]} alt="" />
                  ):(
                    <Carousel data-bs-theme="dark" className='mt-[20px]'>
                      {btn.images.map((item,index)=>(
                        <Carousel.Item key={index} className=''>
                          <img
                            className="d-block w-100 max-h-[400px] object-cover"
                            src={item}
                            alt=""
                          />
                          
                        </Carousel.Item>
                      ))}
                    
                    </Carousel>
                  )}
                   {/* favourist and comments start */}
                    <div className='flex flex-col gap-[10px] mt-[20px]'>
                        <div className='flex justify-between'>
                          <div className='flex gap-[10px] text-[20px]'>
                              <i onClick={()=>likePost(btn.id)} className={`bx bx-heart bx-border hover:border-gray-400 cursor-pointer ${btn.favouristUsersById.find(item=>item===userOnline.id)?'text-red-700':''}`}></i>
                              <i className='bx bxs-comment bx-border-circle hover:border-gray-400 cursor-pointer'></i>
                              <i className='bx bxs-share bx-border hover:border-gray-400 cursor-pointer'></i>
                          </div>
                          <div>
                          <i className='bx bxs-bookmark-minus text-[22px]'></i>
                          </div>
                        </div>
                        <div className='font-bold text-[14px]'> {btn.favouristUsersById.length} lượt thích</div>
                        {btn.detail!==''&&
                        <div className='flex gap-[5px] items-center'>
                          <div className='font-bold'>Hana</div>
                          <div className='h-[20px] text-[14px]'>{btn.detail}</div>
                          {/* <div className='text-[14px] text-gray-500 cursor-pointer'>More</div> */}
                        </div>}
                        <div className='text-[13px] font-bold'>Xem bản dịch</div>
                        {btn.commentsById.length>0&&
                        <div onClick={()=>viewComments(btn.id)} className='text-gray-500 text-[14px] cursor-pointer hover:text-gray-700'>Xem tất cả {btn.commentsById.length} bình luận</div>}
                        <div className='flex items-center justify-between'>
                            <textarea className='text-[14px] placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[80%] max-h-[100px] resize-none' placeholder='Thêm bình luận' />
                            <button className='bg-[rgb(79,70,229)] text-white p-[5px] rounded-[5px] text-[14px] hover:bg-purple-500'>Đăng</button>
                        </div>
                    </div>
                    {/* favourist and comments end */}
              </div>
            ))}
           
          </div>
      </main>
      {/* Posts end */}
    </div>
  )
}
