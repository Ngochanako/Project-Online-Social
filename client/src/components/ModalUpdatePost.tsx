import React from 'react'
import { useDispatch } from 'react-redux'
import { disableModalUpdatePost } from '../store/reducers/ModalReducer';

export default function ModalUpdatePost() {
    const dispatch=useDispatch();
    const closeModal=()=>{
        dispatch(disableModalUpdatePost())
    }
  return (
    <div className='modal'>
        <div onClick={closeModal} className='modal-close z-2'></div>
        <div className='flex flex-col gap-[20px] py-[20px] rounded-[10px] bg-white w-[400px] z-3'>
        <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
            <div className='text-center cursor-pointer hover:text-gray-400'>Xóa</div>
            <hr/>
            <div className='text-center cursor-pointer hover:text-gray-400'>Chỉnh sửa</div>
            <hr />
            <div className='text-center cursor-pointer hover:text-gray-400'>Tắt tính năng bình luận</div>
            <hr />
            <div onClick={closeModal} className='cursor-pointer text-center hover:text-gray-400'>Hủy</div>           
        </div>
      
    </div>
  )
}
