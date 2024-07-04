import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { disableModalAllComment } from '../store/reducers/ModalReducer';

export default function ModalAllComment() {
    const dispatch=useDispatch();
    const closeModal=()=>{
        dispatch(disableModalAllComment())
    }
  return (
    <div className='modal'>
        <div onClick={closeModal} className='modal-close'></div>
        <div className='formModalAllComment flex'>
        <i onClick={closeModal} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
            {/* Slider Img or video */}
            <Carousel data-bs-theme="dark" className='mt-[20px] w-[380px]'>
                <Carousel.Item className=''>
                    <img
                    className="d-block w-[380px] max-h-[400px] object-cover "
                    src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-23.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className=''>
                    <img
                    className="d-block w-[380px] max-h-[400px] object-cover "
                    src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-26.jpg"
                    alt="Second slide"
                    />

                </Carousel.Item>
           </Carousel>
           
            <div className='flex flex-col gap-[10px] p-[10px] w-[420px]'>
                <div className='flex items-center'>
                        <img className='w-[50px] h-[50px] rounded-[50%]' src='https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-1.jpg' alt="" />
                        <div className='font-bold'>Hana <span className='text-[rgb(79,70,229)] font-bold'>Theo dõi</span></div>
                </div>
                <hr />
                 {/* All comment start */}
                 <div className='all-comment flex flex-col gap-[15px] overflow-auto max-h-[250px]'>               
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
                    <p>overflow và overscroll là hai thuộc tính CSS khác nhau với các chức năng riêng biệt liên quan đến việc xử lý nội dung vượt quá kích thước của phần tử chứa. Dưới đây là giải thích chi tiết về sự khác nhau giữa chúng:

Overflow
Thuộc tính overflow kiểm soát cách nội dung của một phần tử được xử lý khi nó vượt quá kích thước của phần tử chứa. Các giá trị phổ biến của overflow bao gồm:

visible: Nội dung không bị cắt và vượt ra ngoài phần tử chứa.
hidden: Nội dung vượt quá sẽ bị ẩn.
scroll: Luôn luôn hiển thị thanh cuộn, bất kể có nội dung vượt quá hay không.
auto: Hiển thị thanh cuộn chỉ khi cần thiết (khi có nội dung vượt quá).</p>
                 </div>
                {/* All Comment end */}
                <hr />
                {/* Favourist */}
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
                <div className='text-gray-500 text-[14px]'>13 tháng 6</div>
                
                {/* Comment */}
                <div className='flex items-center justify-between'>
                    <textarea className=' resize-none text-[14px] placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[85%] max-h-[100px]' placeholder='Thêm bình luận' />
                    <button className='bg-[rgb(79,70,229)] text-white p-[5px] rounded-[5px] text-[14px] hover:bg-purple-500'>Đăng</button>
                </div>
            </div>
        </div>      
    </div>
  )
}

