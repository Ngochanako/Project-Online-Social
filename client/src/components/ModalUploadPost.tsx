
import { disableModalUploadPost } from '../store/reducers/ModalReducer';
import Carousel from 'react-bootstrap/Carousel';
import  { useEffect, useState } from 'react';
import { Post, State, User } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLogin, setUserLogin } from '../services/userLogin.service';
import axios from 'axios';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '../services/users.service';
import { addNewPost } from '../services/posts.service';
export default function ModalUploadPost() {
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const previewImages=useSelector((state:State)=>state.previewImages)
    const imagesPost=useSelector((state:State)=>state.imagesPost);
    const [contentPost,setContentPost]=useState<string>('');
    const modalUploadPost=useSelector((state:State)=>state.modal.uploadPost);
    const group=useSelector((state:State)=>state.group)
    console.log(group);
    
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
    const closeModal=()=>{
        dispatch(disableModalUploadPost({type:'',status:false}));
    }
    //get count Char
    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContentPost(e.target.value);
    }
    //upload new Post
    const uploadNewPost=()=>{
      const newImgs:string[]=[];
      for(let value of imagesPost){
        const imageRef=ref(storage,`imagesPost/${value.name}`)
        uploadBytes(imageRef, value).then((snapshot) => getDownloadURL(snapshot.ref))
       .then((url) =>
            {              
             newImgs.push(url); 
             if(newImgs.length===imagesPost.length){
              if(modalUploadPost.type==='personal'){
              let newPost:Post={
                id:uuidv4(),
                idUser:userOnline.id,
                avatarUser:userOnline.avatar,
                userNameUser:userOnline.username,
                detail:contentPost,
                date:new Date().getTime(),
                fullDate:new Date().toISOString().split('T')[0],
                images:newImgs,
                commentsById:[],
                favouristUsersById:[],
                idGroup:null,
                status:true 
               }             
               let editUser:User={...userOnline,postsById:[...userOnline.postsById,newPost.id]};      
               dispatch(setUserLogin(editUser));
               dispatch(updateUser(editUser));
               dispatch(addNewPost(newPost));
               dispatch(disableModalUploadPost({type:'',status:false}));
             } else if(modalUploadPost.type==='group'){
              console.log(3);
              
              let newPost:Post={
                id:uuidv4(),
                idUser:userOnline.id,
                avatarUser:userOnline.avatar,
                userNameUser:userOnline.username,
                detail:contentPost,
                date:new Date().getTime(),
                fullDate:new Date().toISOString().split('T')[0],
                images:newImgs,
                commentsById:[],
                favouristUsersById:[],
                idGroup:group.id,
                status:true 
               }  
               let editUser:User={...userOnline,postsById:[...userOnline.postsById,newPost.id]};      
               dispatch(setUserLogin(editUser));
               dispatch(updateUser(editUser));
               dispatch(addNewPost(newPost));
               dispatch(disableModalUploadPost({type:'',status:false}));     
             }  
            }                         
            }
       )
      }       
    }
  return (
<div className='modal'>
    <div onClick={closeModal} className='modal-close z-2'></div>
    <div className='flex flex-col gap-[20px] py-[20px] rounded-[10px] bg-white w-[800px] z-3'>
    <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
        <div onClick={uploadNewPost} className='text-[16px] font-bold text-center text-orange-400 hover:text-orange-700 cursor-pointer'>Chia sẻ</div>
        <hr/>
        <div className='flex'>
            {/* Album ảnh vừa chọn */}
            {previewImages.length>1?(
               <Carousel data-bs-theme="dark" className='mt-[20px] w-[380px]'>
               {previewImages.map((img,index)=>(
                   <Carousel.Item className='' key={index}>
                   <img
                   className="d-block w-[380px] max-h-[400px] object-cover "
                   src={img}
                   alt=""
                   />
                   </Carousel.Item>
               ))}
          </Carousel>
            ):(
                <img
                className="d-block w-[380px] max-h-[400px] object-cover "
                src={previewImages[0]}
                alt=""
                />  
            )}
           <div className='p-[20px]'>
              <div className='flex gap-[20px] items-center'>
                <img className='w-[50px] h-[50px] rounded-[50%]' src={userOnline.avatar} alt="" />
                <div className='font-bold'>{userOnline.username} </div>
              </div>
              <textarea onChange={handleChange} maxLength={200} className='mt-[50px]' id="white-textarea" placeholder='Viết chú thích...'></textarea>
              <p className='text-[14px] text-gray-500'>{contentPost.length}/200 ký tự</p>
           </div>
        </div>              
    </div>
  
</div>
  )
}
