import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { resetUserLogin } from '../services/userLogin.service';
import { NavLink } from "react-router-dom";
import ModalCreatePost from "./ModalCreatePost";
import { State } from "../interfaces";
import { activeModalPost } from "../store/reducers/ModalReducer";
import ModalUploadPost from "./ModalUploadPost";
export default function Home() {
    //Initialization
    const [viewmore,setViewmore]=useState<boolean>(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const modalPost=useSelector((state:State)=>state.modal.post);
    const modalUploadPost=useSelector((state:State)=>state.modal.uploadPost)
  //click viewmore
  const handleClickViewMore=(e:React.MouseEvent<HTMLDivElement>)=>{
    setViewmore(!viewmore);
  }
  //logout
  const logout=(event:React.MouseEvent<HTMLDivElement>)=>{ 
    navigate('/login');       
     dispatch(resetUserLogin({
      id:'',
  username:'',
  password:'',
  email:'',
  avatar:'',
  biography:'',
  gender:'',
  posts:[],
  followersById:[],
  followUsersById:[],
  status:true,
     }
    ));
  }
  //nav link
  const active=({isActive}:{isActive:boolean})=>{
    return {
        fontWeight:isActive?'bold':'normal',
    }
}
//open modal create Post
  const openModalPost=()=>{
    dispatch(activeModalPost());
  }
  return (
    <div className=''>
        {modalPost && <ModalCreatePost/>}
        {modalUploadPost && <ModalUploadPost/>}
        {/* Header left start */}
      <header className='header-left p-[30px]'>
        <div className='header-list-item mb-[30px]'>
          <i className="fa-brands fa-instagram text-[20px]"></i>
          <div className='text-[20px] font-[600]'>INSTAGRAM</div>
        </div>
        <div className='flex flex-col gap-[10px] text-[15px]'>
        <div className='header-list-item'>
          <i className="fa-solid fa-house text-[#565555] text-[22px]"></i>
          <NavLink style={active} to={'/'}>Trang chủ</NavLink>
        </div>
        <div className='header-list-item'>
          <i className="fa-solid fa-magnifying-glass text-[#565555] text-[22px]"></i>
          <div className=''>Tìm kiếm</div>
        </div>
        <div className='header-list-item'>
         <i className="fa-solid fa-plane text-[#565555] text-[22px]"></i>
          <div className=''>Khám phá</div>
        </div>
        <div className='header-list-item'>
          <i className="fa-solid fa-video text-[#565555] text-[22px]"></i>
          <div className=''>Reels</div>
        </div>
        <div className='header-list-item'>
        <i className="fa-brands fa-facebook-messenger text-[#565555] text-[22px]"></i>
          <div className=''>Tin nhắn</div>
        </div>
        <div className='header-list-item'>
        <i className="fa-solid fa-heart text-[#565555] text-[22px]"></i>
          <div className=''>Thông báo</div>
        </div>
        <div className='header-list-item'>
        <i className="fa-solid fa-plus text-[#565555] text-[22px]"></i>
          <div onClick={openModalPost} className='cursor-pointer'>Tạo</div>
        </div>
        <div className='header-list-item'>
        <i className="fa-solid fa-user text-[#565555] text-[22px]"></i>
          <NavLink style={active} to={'personal'}>Trang cá nhân</NavLink>
        </div>
        <div className='header-list-item'>
        <i className="fa-solid fa-bars text-[#565555] text-[22px] relative"></i>
          <div onClick={handleClickViewMore} className=''>Xem thêm</div>
          {/* section View More */}
          {viewmore &&  <div className='flex flex-col p-[10px] bg-white absolute top-[380px] right-[20px] z-[1000] shadow-2xl rounded-lg'>
              <div className='viewmore-item flex gap-[20px]'>
                <i className="fa-solid fa-gear"></i>
                <div>Cài đặt</div>
              </div>
              <div className='viewmore-item flex gap-[20px]'>
                <i className="fa-solid fa-chart-line"></i>
                <div>Hoạt động của bạn</div>
              </div>
              <div  className=' viewmore-item flex gap-[20px]'>
              <i className="fa-solid fa-right-from-bracket"></i>
                <div onClick={logout}>Đăng xuất</div>
              </div>
          </div>}
        </div>
        </div>
      </header>
      {/* Header-left end */}
      <Outlet/>
    </div>
  )
}
