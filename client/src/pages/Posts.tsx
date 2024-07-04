import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import ModalAllComment from './ModalAllComment';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../interfaces';
import { activeModalAllComment } from '../store/reducers/ModalReducer';
export default function Posts() {
     //Initialization
     const modalAllComment=useSelector((state:State)=>state.modal.comments);
     const dispatch=useDispatch();
     //open Modal All Comment
     const viewComments=()=>{
        dispatch(activeModalAllComment());
     }
  return (
    <div className='w-[70%]'>
      {/* Modal All Comment Start */}
      {modalAllComment &&<ModalAllComment/>}
      {/* Reel start */}
      {/* Reel end */}
      {/* Posts start */}
      <main className='px-[100px] py-[50px]'>
          <div className=''>
            <hr />
            {/* Title start */}
            <div className='flex justify-between mt-[20px] items-center'>
              <div className='flex items-center gap-[7px]'>
                <img className='w-[50px] h-[50px] rounded-[50%]' src='https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-1.jpg' alt="" />
                <div className='font-bold'>Hana</div>
                <div className='w-[4px] h-[4px] rounded-[50%] bg-gray-500'></div>
                <div className='text-gray-500 text-[14px]'>23h</div>
                <div className='w-[4px] h-[4px] rounded-[50%] bg-gray-500'></div>
                <div className='text-[rgb(0,144,237)] font-[600] text-[14px]'>Theo dõi</div>
              </div>
              <div className='flex gap-[3px]'>
                <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
                <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
                <div className='w-[3px] h-[3px] rounded-[50%] bg-gray-500'></div>
              </div>
            </div>
           {/* title end */}
           {/* Slider start */}
           <Carousel data-bs-theme="dark" className='mt-[20px]'>
      <Carousel.Item className=''>
        <img
          className="d-block w-100 max-h-[400px] object-cover"
          src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-23.jpg"
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className=''>
        <img
          className="d-block w-100 'max-h-[400px] object-cover"
          src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-26.jpg"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
           </Carousel>
            {/* Slider end */}
            {/* favourist start */}
            <div className='flex flex-col gap-[10px] mt-[20px]'>
                <div className='flex justify-between'>
                   <div className='flex gap-[10px] text-[20px]'>
                      <i className='bx bx-heart bx-border hover:border-gray-400 cursor-pointer'></i>
                      <i className='bx bxs-comment bx-border-circle hover:border-gray-400 cursor-pointer'></i>
                      <i className='bx bxs-share bx-border hover:border-gray-400 cursor-pointer'></i>
                   </div>
                   <div>
                   <i className='bx bxs-bookmark-minus text-[22px]'></i>
                   </div>
                </div>
                <div className='font-bold text-[14px]'> 229.000 lượt thích</div>
                <div className='flex gap-[5px] items-center'>
                  <div className='font-bold'>Hana</div>
                  <div className='truncate h-[20px] text-[14px]'>RFG25 Aero Forged Gloss White suited on my Ferrari! Part of the Fully Forged & Customizable RFG Series. Made in LA</div>
                  <div className='text-[14px] text-gray-500 cursor-pointer'>More</div>
                </div>
                <div className='text-[13px] font-bold'>Xem bản dịch</div>
                <div onClick={viewComments} className='text-gray-500 text-[14px] cursor-pointer hover:text-gray-700'>Xem tất cả 25 bình luận</div>
                <div className='flex items-center justify-between'>
                    <textarea className='text-[14px] placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[80%] max-h-[100px] resize-none' placeholder='Thêm bình luận' />
                    <button className='bg-[rgb(79,70,229)] text-white p-[5px] rounded-[5px] text-[14px] hover:bg-purple-500'>Đăng</button>
                </div>
            </div>
          </div>
      </main>
      {/* Posts end */}
    </div>
  )
}
