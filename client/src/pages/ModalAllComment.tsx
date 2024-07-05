import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { disableModalAllComment } from '../store/reducers/ModalReducer';
import { Post, State } from '../interfaces';
import axios from 'axios';
import { setPost } from '../store/reducers/PostReducer';
import { v4 as uuidv4 } from 'uuid';

export default function ModalAllComment() {
    const userOnline=useSelector((state:State)=>state.userLogin)
    const dispatch=useDispatch();
    const post:Post=useSelector((state:State)=>state.post);
    const [user,setUser]=useState<any>({});
    const [visibleComments,setVisibleComment]=useState<{idComment:string,visible:number}>({idComment:'',visible:1});
    const [idCommentViewMore,setIdCommentViewMore]=useState<string>('');
    const [valueComment, setValueComment]=useState<string>('');
    const [idCommentPost,setIdCommentPost]=useState<string>('')
    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${post.idUser}`)
        .then(response=>setUser(response.data))
        .catch(err=>console.log(err))
    },[])
    //close Modal
    const closeModal=()=>{
        dispatch(disableModalAllComment())
    }
    //follow User
    const followUser=()=>{
        
    }
    //view more Comment
    const viewMoreComment=(idComment:string)=>{
          setIdCommentViewMore(idComment);
         setVisibleComment((prev)=>prev.idComment===idComment?{...prev,visible:prev.visible+1}:prev);
    }
    // like or unlike Post
    const favouristPost=()=>{
        if(post.favouristUsersById.find(btn=>btn==userOnline.id)){
            let newPost={
                ...post,
                favouristUsersById:post.favouristUsersById.filter(btn=>btn!==userOnline.id)
            }
            dispatch(setPost(newPost));
        }else{
            let newPost={
                ...post,
                favouristUsersById:[...post.favouristUsersById,userOnline.id]
            }
            dispatch(setPost(newPost));
        }
    }
    //handleChange Comment
    const handleChangeComment=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        let value=e.target.value;
        setValueComment(value);
    }
    // post Comment
    const postComment=()=>{
        if(valueComment==''){
            let newComment={
                id:uuidv4(),
                
            }
        }
    }
  return (
    <div className='modal'>
        <div onClick={closeModal} className='modal-close'></div>
        <div className='formModalAllComment flex'>
        <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
            {/* Slider Img or video */}
            <Carousel data-bs-theme="dark" className='mt-[20px] w-[380px]'>
                {post.images.map((btn,index)=>(
                   <Carousel.Item className='' key={index}>
                   <img
                   className="d-block w-[380px] max-h-[400px] object-cover "
                   src={btn}
                   alt=""
                   />
               </Carousel.Item> 
                ))}
           </Carousel>
           
            <div className='flex flex-col gap-[10px] p-[10px] w-[420px]'>
                <div className='flex items-center'>
                        <img className='w-[50px] h-[50px] rounded-[50%]' src={user.avatar} alt="" />
                        <div className='font-bold'>{user.username} {userOnline.id!==user.id?(<span onClick={followUser} className='text-[rgb(79,70,229)] font-bold'>Theo dõi</span>):('')}</div>
                </div>
                <hr />
                 {/* All comment start */}
                 <div className='all-comment flex flex-col gap-[15px] overflow-auto max-h-[250px]'> 
                    {post.comments.map(btn=>(
                        <div key={btn.id} className='flex flex-col'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatarUser} alt="" />
                                    <div>
                                        <p className='font-bold'>{btn.userNameUser}<span className='text-[14px] font-normal'> {btn.detail}</span></p>
                                        <div className='flex gap-[20px] text-gray-500 text-[12px]'>
                                            <div>{Math.ceil(new Date().getTime()-btn.date)/(1000*60*60)} h</div>
                                            <div>Trả lời</div>
                                        </div>
                                    </div>
                                </div>
                                <i className='bx bx-heart' ></i>
                            </div>
                            {btn.comments.length>0?
                               (<div className='flex gap-[20px] text-gray-500 font-bold text-[12px]'>
                                   <div>------------</div>
                                   <div>
                                        <div onClick={()=>viewMoreComment(btn.id)}>Xem thêm bình luận ({btn.comments.length})</div>
                                        <div className={idCommentViewMore===btn.id?'flex flex-col gap-[10px]':'hidden flex flex-col gap-[10px]'}>
                                            {btn.comments.slice(0,visibleComments.visible).map(item=>(
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center'>
                                                    <img className='w-[50px] h-[50px] rounded-[50%]' src={item.avatarUser} alt="" />
                                                    <div>
                                                        <p className='font-bold'>{item.userNameUser}<span className='text-[14px] font-normal'><span className='font-bold'> @{item.userNameParent}</span>{item.detail}</span></p>
                                                        <div className='flex gap-[20px] text-gray-500 text-[12px]'>
                                                            <div>{Math.ceil(new Date().getTime()-btn.date)/(1000*60*60)} h</div>
                                                            <div>Trả lời</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i className='bx bx-heart' ></i>
                                            </div>
                                            ))}
                                            
                                        </div>
                                    </div>
                                  
                               </div>):('')
                            }
                        </div>
                        
                    ))}     
                    <div className='flex flex-col'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <img className='w-[50px] h-[50px] rounded-[50%]' src={userOnline.avatar} alt="" />
                                    <div>
                                        <p className='font-bold'>aaaa<span className='text-[14px] font-normal'> linh tinh</span></p>
                                        <div className='flex gap-[20px] text-gray-500 text-[12px]'>
                                            <div>20 h</div>
                                            <div>Trả lời</div>
                                        </div>
                                    </div>
                                </div>
                                <i className='bx bx-heart' ></i>
                            </div>
                           
                               <div className='flex gap-[20px] text-gray-500 font-bold text-[12px]'>
                                   <div>-------------</div>
                                    <div>
                                        <div>Xem thêm bình luận(7)</div>
                                        <div>
                                        <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <img className='w-[50px] h-[50px] rounded-[50%]' src={userOnline.avatar} alt="" />
                                    <div>
                                        <p className='font-bold'>aaaa<span className='text-[14px] font-normal'> linh tinh</span></p>
                                        <div className='flex gap-[20px] text-gray-500 text-[12px]'>
                                            <div>20 h</div>
                                            <div>Trả lời</div>
                                        </div>
                                    </div>
                                </div>
                                <i className='bx bx-heart' ></i>
                            </div>
                                        </div>
                                    </div>
                               </div>
                            
                        </div>         
                     <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <img className='w-[50px] h-[50px] rounded-[50%]' src='https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-1.jpg' alt="" />
                            <div>
                                <p className='font-bold'>hihii</p>
                                <div className='flex gap-[20px] text-gray-500 text-[12px]'>
                                    <div>2 tuần</div>
                                    <div>Trả lời</div>
                                </div>
                            </div>
                        </div>
                        <i className='bx bx-heart' ></i>
                    </div>
                 </div>
                {/* All Comment end */}
                <hr />
                {/* Favourist */}
                <div className='flex justify-between'>
                   <div className='flex gap-[10px] text-[20px]'>            
                      <i onClick={favouristPost} className={`bx bx-heart bx-border hover:border-gray-400 cursor-pointer ${post.favouristUsersById.find(btn=>btn===userOnline.id)?'text-red-700':''}`}></i>
                      <i className='bx bxs-comment bx-border-circle hover:border-gray-400 cursor-pointer'></i>
                      <i className='bx bxs-share bx-border hover:border-gray-400 cursor-pointer'></i>
                   </div>
                   <div>
                   <i className='bx bxs-bookmark-minus text-[22px]'></i>
                   </div>
                </div>
                <div className='font-bold text-[14px]'> {post.favouristUsersById.length} lượt thích</div>
                <div className='text-gray-500 text-[14px]'>{post.fullDate}</div>
                
                {/* Comment */}
                <div className='flex items-center justify-between'>
                    <textarea onChange={handleChangeComment} className=' resize-none text-[14px] placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[85%] max-h-[100px]' placeholder='Thêm bình luận' />
                    <button onClick={postComment} className='bg-[rgb(79,70,229)] text-white p-[5px] rounded-[5px] text-[14px] hover:bg-purple-500'>Đăng</button>
                </div>
            </div>
        </div>      
    </div>
  )
}

