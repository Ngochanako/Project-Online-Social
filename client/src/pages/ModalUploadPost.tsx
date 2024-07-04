
import { disableModalUploadPost } from '../store/reducers/ModalReducer';
import Carousel from 'react-bootstrap/Carousel';
import  { useEffect, useState } from 'react';
import { State, User } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLogin } from '../services/userLogin.service';
import axios from 'axios';
export default function ModalUploadPost() {
    const userOnline:User=useSelector((state:State)=>state.userLogin)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const previewImages=useSelector((state:State)=>state.previewImages)
    const [countChar,setCountChar]=useState<number>(0);
    //load Page when user is not login or login
    useEffect(()=>{
        console.log(previewImages);
        
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
        dispatch(disableModalUploadPost());
    }
    //get count Char
    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setCountChar(e.target.value.length);
    }
  return (
<div className='modal'>
    <div onClick={closeModal} className='modal-close z-2'></div>
    <div className='flex flex-col gap-[20px] py-[20px] rounded-[10px] bg-white w-[800px] z-3'>
    <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
        <div className='text-[16px] font-bold text-center'>Tạo bài viết mới</div>
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
              <p className='text-[14px] text-gray-500'>{countChar}/200 ký tự</p>
           </div>
        </div>              
    </div>
  
</div>
  )
}
