import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { disableModalAvatar } from '../store/reducers/ModalReducer';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
export default function ModalAvatar() {
    const [img,setImg]=useState<any>('');
    const [nameImg,setNameImg]=useState<string>('');
    const dispatch=useDispatch();
    const closeModal=()=>{
        dispatch(disableModalAvatar())
    }
    //upload img Avatar
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=e.target.files?.[0]
      setImg(value);
      setNameImg(e.target.value);
      const imageRef=ref(storage,`imagesPost/${img.name}`)
      uploadBytes(imageRef, img).then((snapshot) => getDownloadURL(snapshot.ref))
     .then((url) =>
          {
             const product={
                 name:name,
                 image:url
             }
             axios.post("http://localhost:3000/product",product)
          }
     )
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
