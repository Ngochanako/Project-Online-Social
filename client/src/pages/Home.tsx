import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { resetUserLogin } from '../services/userLogin.service';
import { NavLink } from "react-router-dom";
import ModalCreatePost from "../components/ModalCreatePost";
import { State } from "../interfaces";
import { activeModalPost } from "../store/reducers/ModalReducer";
import ModalUploadPost from "../components/ModalUploadPost";
import ModalAllComment from "../components/ModalAllComment";
import ModalUpdatePost from "../components/ModalUpdatePost";
import ModalDelete from "../components/ModalDelete";
import ModalEditPost from "../components/ModalEditPost";
import ModalAvatar from "../components/ModalAvatar";
export default function Home() {
    //Initialization
    const modalAllComment=useSelector((state:State)=>state.modal.comments);
    const [viewmore,setViewmore]=useState<boolean>(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const modalPost=useSelector((state:State)=>state.modal.post);
    const modalUploadPost=useSelector((state:State)=>state.modal.uploadPost);
    const modalUpdatePost=useSelector((state:State)=>state.modal.updatePost);
    const modalDelete=useSelector((state:State)=>state.modal.delete);
    const modalEditPost=useSelector((state:State)=>state.modal.editPost);
    const modalAvatar=useSelector((state:State)=>state.modal.avatar);
  //click viewmore
  const handleClickViewMore=(e:React.MouseEvent<HTMLDivElement>)=>{
    setViewmore(!viewmore);
  }
  //logout
  const logout=(event:React.MouseEvent<HTMLDivElement>)=>{ 
    navigate('/preLogin');       
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
       {modalAllComment &&<ModalAllComment/>}
        {modalPost && <ModalCreatePost/>}
        {modalUploadPost && <ModalUploadPost/>}
        {modalUpdatePost&&<ModalUpdatePost/>}
        {modalDelete&&<ModalDelete/>}
        {modalEditPost&&<ModalEditPost/>}
        {modalAvatar&&<ModalAvatar/>}
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
          {viewmore &&  <div className='flex flex-col p-[10px] bg-white absolute top-[350px] right-[20px] z-[1000] shadow-2xl rounded-lg'>
              <div className='viewmore-item flex gap-[20px]'>
                <i className="fa-solid fa-gear"></i>
                <NavLink style={active} to={'personal/edit'}> Chỉnh sửa trang cá nhân</NavLink>
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
