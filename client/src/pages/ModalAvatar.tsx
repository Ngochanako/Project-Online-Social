import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableModalAvatar } from '../store/reducers/ModalReducer';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { updateUser } from '../services/user.service';
import { State, User } from '../interfaces';
import { setUserLogin } from '../services/userLogin.service';
export default function ModalAvatar() {
    const dispatch=useDispatch();
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const closeModal=()=>{
        dispatch(disableModalAvatar())
    }
    //upload img Avatar
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value:any=e.target.files?.[0]
      const imageRef=ref(storage,`imagesPost/${value.name}`)
      uploadBytes(imageRef, value).then((snapshot) => getDownloadURL(snapshot.ref))
     .then((url) =>
          {
            const userUpdate:User={...userOnline,avatar:url}
            dispatch(updateUser(userUpdate));
            dispatch(setUserLogin(userUpdate));       
          }
     )
     dispatch(disableModalAvatar())
    }
  return (
    <div className='modal'>
        <div onClick={closeModal} className='modal-close z-2'></div>
        <div className='flex flex-col gap-[20px] py-[20px] rounded-[10px] bg-white w-[400px] z-3'>
        <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
            <div className='text-[20px] text-center'>Thay đổi ảnh đại diện</div>
            <hr/>
            <form action="">
                 <input onChange={handleChange} className='hidden' type="file" id='avatar' />
                 <label className='text-orange-600 font-bold text-[14px] text-center cursor-pointer' htmlFor="avatar">Tải ảnh lên</label>
            </form>
            <hr />
            <div className='text-center text-[14px] font-bold text-indigo-800 cursor-pointer'>Gỡ ảnh hiện tại</div> 
            <hr />
            <div onClick={closeModal} className='cursor-pointer text-center text-[14px]'>Hủy</div>           
        </div>
      
    </div>
  )
}
