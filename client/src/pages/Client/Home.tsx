import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getUserLogin, resetUserLogin, setUserLogin } from '../../services/userLogin.service';
import { NavLink } from "react-router-dom";
import ModalCreatePost from "../../components/ModalCreatePost";
import { State, User } from "../../interfaces";
import { activeModalPost } from "../../store/reducers/ModalReducer";
import ModalUploadPost from "../../components/ModalUploadPost";
import ModalAllComment from "../../components/ModalAllComment";
import ModalUpdatePost from "../../components/ModalUpdatePost";
import ModalDelete from "../../components/ModalDelete";
import ModalEditPost from "../../components/ModalEditPost";
import ModalAvatar from "../../components/ModalAvatar";
import axios from "axios";
import { getUsers, updateUser } from "../../services/users.service";
import Button from 'react-bootstrap/Button';

export default function Home() {
    //Initialization
    const modalAllComment=useSelector((state:State)=>state.modal.comments);
    const userOnline=useSelector((state:State)=>state.userLogin);
    const users=useSelector((state:State)=>state.users)
    const [viewmore,setViewmore]=useState<boolean>(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const modalPost=useSelector((state:State)=>state.modal.post);
    const modalUploadPost=useSelector((state:State)=>state.modal.uploadPost);
    const modalUpdatePost=useSelector((state:State)=>state.modal.updatePost);
    const modalDelete=useSelector((state:State)=>state.modal.delete);
    const modalEditPost=useSelector((state:State)=>state.modal.editPost);
    const modalAvatar=useSelector((state:State)=>state.modal.avatar);
    const [usersSearch,setUsersSearch]=useState<User[]>([]);
    const [search,setSearch]=useState<Boolean>(false);
    const [requestFollow,setRequestFollow]=useState<Boolean>(false);
    const [usersRequestFollow,setUsersRequest]=useState<User[]>([]);
    //get UserLogin
    useEffect(()=>{
      dispatch(getUserLogin())
      dispatch(getUsers())
    },[])
    //get list user request follow
    useEffect(()=>{
       let newusers=users.filter(btn=>userOnline.requestFollowById.includes(btn.id));
       setUsersRequest(newusers);
    },[users,userOnline])
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
  //search User
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
      let value=e.target.value;
      axios.get( `http://localhost:3000/users?username_like=${value}`)
      .then(response=>setUsersSearch(response.data))
      .catch(err=>console.log(err))
  }
  //open Search
  const openSearch=()=>{
     setSearch(!search);
  }
  const closeSearch=()=>{
    setSearch(false)
  }
  //open Request Follow
  const openRequestFollow=()=>{
    setRequestFollow(!requestFollow);
  }
  const closeRequestFollow=()=>{
    setRequestFollow(false);
  }
  //confirm Follow
  const confirmRequestFollow=(id:string)=>{
     let newUser={
      ...userOnline,
      followersById:[...userOnline.followersById,id],
      requestFollowById:userOnline.requestFollowById.filter(btn=>btn!==id)
     }
    dispatch(updateUser(newUser));
    dispatch(setUserLogin(newUser));
  }
  //cancel Follow
  const cancelRequestFollow=(id:string)=>{
    let newUser={
      ...userOnline,
      requestFollowById:userOnline.requestFollowById.filter(btn=>btn!==id)
    }
    dispatch(updateUser(newUser));
    dispatch(setUserLogin(newUser));
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
      <header className='header-left  p-[30px] fixed'>
        <div className='header-list-item mb-[30px]'>
          <i className="fa-brands fa-instagram text-[20px]"></i>
          <div className='text-[20px] font-[600]'>INSTAGRAM</div>
        </div>
        <div className='flex flex-col gap-[10px] text-[15px]'>
        <NavLink  style={active} to={'/'} className='header-list-item'>
          <i className="fa-solid fa-house text-[#565555] text-[22px]"></i>
          <div>Trang chủ</div>
        </NavLink>
        <div onClick={openSearch} className='header-list-item'>
          <i className="fa-solid fa-magnifying-glass text-[#565555] text-[22px]"></i>
          <div  className=''>Tìm kiếm</div>
          {search&&
          <div className="absolute z-1000 top-0 left-20 w-[400px] h-[99%]  bg-white flex flex-col gap-[50px] rounded-r-[10px] shadow-lg">
            <i onClick={closeSearch} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-gray-600 top-[20px] right-[20px] absolute"></i>
              <div className="text-[20px] font-bold px-[50px] pt-[50px]">Tìm kiếm</div>
              <input onChange={handleSearch} type="text" className="mx-[50px] bg-[rgb(239,239,239)] p-[10px] text-[14px]" placeholder="Tìm kiếm người dùng" />
              <hr className=""/>
              <div className="flex flex-col gap-[20px] px-[50px]">
                  {usersSearch.map(btn=>(
                      <div className='flex items-center'>
                      <img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatar} alt="" />
                       <div>
                       <Link to={`/user/${btn.id}`}><p className=''>{btn.username}</p></Link>
                       <p className="text-gray-500 text-[14px]">{btn.followersById.length} người theo dõi</p>
                       </div>
                  </div>
                  ))}
                  
              </div>
              
          </div>}
        </div>
        <div className='header-list-item'>
         <i className="fa-solid fa-user-plus text-[#565555] text-[22px]"></i>
          <div onClick={openRequestFollow} className=''>Theo dõi</div>
          {userOnline.requestFollowById.length>0&&<div className="w-[20px] h-[20px] rounded-[50%] bg-red-500 text-white flex justify-center items-center absolute right-[190px] top-[220px]">{userOnline.requestFollowById.length}</div>}
          
          {requestFollow&&
          <div className="absolute z-1000 top-0 left-20 w-[400px] h-[99%]  bg-white flex flex-col gap-[50px] rounded-r-[10px] shadow-lg">
            <i onClick={closeRequestFollow} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-gray-600 top-[20px] right-[20px] absolute"></i>
              <div className="text-[20px] font-bold px-[50px] pt-[50px]">Yêu cầu theo dõi</div>
              <hr className=""/>
              <div className="flex flex-col gap-[20px] px-[50px]">
                  {usersRequestFollow.map(btn=>(
                      <div key={btn.id} className="flex items-center justify-center gap-[10px]">
                          <Link to={`/user/${btn.id}`}><img className="w-[50px] h-[50px] rounded-[50%]" src={btn.avatar} alt="" /></Link>
                          <div>
                            <Link to={`/user/${btn.id}`}><p className="font-bold">{btn.username}</p></Link>
                            <div className="flex gap-[20px]">
                            <Button onClick={()=>confirmRequestFollow(btn.id)} variant="primary">Xác nhận</Button>
                            <Button onClick={()=>cancelRequestFollow(btn.id)} variant="secondary">Xóa</Button>
                            </div>
                          </div>
                      </div>
                      
                  ))}              
              </div>             
          </div>}
        </div>
        <NavLink style={active} to={'group'} className='header-list-item'>
       
          <i className="fa-solid fa-user-group text-[#565555] text-[22px]"></i>
          <div className=''>Nhóm</div>
       
        </NavLink>
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
        <NavLink style={active} to={'personal'} className='header-list-item'>
        <i className="fa-solid fa-user text-[#565555] text-[22px]"></i>
          <div>Trang cá nhân</div>
        </NavLink>
        <div onClick={handleClickViewMore} className='header-list-item'>
        <i className="fa-solid fa-bars text-[#565555] text-[22px] relative"></i>
          <div  className=''>Xem thêm</div>
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
