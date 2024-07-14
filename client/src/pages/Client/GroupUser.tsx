import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  State } from '../../interfaces';
import type{ Group, Post, User } from '../../interfaces';
import { getUserLogin } from '../../services/userLogin.service';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addNewGroup, getGroups } from '../../services/groups.service';
import axios from 'axios';
export default function GroupUser() {
    const [valueSearch,setValueSearch]=useState<string>('');
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const users=useSelector((state:State)=>state.users);
    const [usersFind,setUsersFind]=useState<User[]>([])
    const posts:Post[]=useSelector((state:State)=>state.posts);
    const groups:Group[]=useSelector((state:State)=>state.groups);
    const [groupsByUserOnline,setGroupsByUserOnline]=useState<Group[]>([]);
    const [selectedUser,setSelectedUser]=useState<User[]>([])
    const dispatch=useDispatch();
    const [newGroup,setNewGroup]=useState<boolean>(false);
    const navigate=useNavigate()
    const [group,setGroup]=useState<Group>({
      id:'',
    groupName:'',
    usersById:[],
    status:true,
    avatar:'',
    private:false,
    adminById:'',
    })
    //resetGroup
    const resetGroup=()=>{
      setGroup({
        id:'',
    groupName:'',
    usersById:[],
    status:true,
    avatar:'',
    private:false,
    adminById:'',
      })
    }
    //check login
    useEffect(()=>{ 
      axios.get(`http://localhost:3000/users/${userOnline.id}`)
    .then(response=>{
        if(response.data.id==''||response.data.status==false){
           navigate('/preLogin')        
        }
        })
    .catch(err=>console.log(err))
    })
    //get groups from api
    useEffect(()=>{
      dispatch(getGroups());
    },[])
    // set group by User
    useEffect(()=>{
        let newGroups:Group[]=groups.filter(btn=>btn.usersById.includes(userOnline.id));
        
        
        setGroupsByUserOnline(newGroups);
    },[userOnline,groups])

    
    //set Users find begin
    useEffect(()=>{
        setUsersFind(users.filter(btn=>btn.id!==userOnline.id))
    },[users])
    // nav link
    const active=({isActive}:{isActive:boolean})=>{
      return {
          backgroundColor:isActive?'rgb(240,242,245)':'white',
      }
    }
    //form create new group start
     
    //open new group
    const openNewGroup=()=>{
      setNewGroup(true)
    }
    //close new group
    const closeNewGroup=()=>{
      setNewGroup(false)
    }
    //handle Change value form
    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        let {name,value}=e.target;
        if(name=='private'){
          if(value=='1'){
             setGroup({...group,private:false})
          }else if(value=='2'){
            setGroup({...group,private:true})
          }
        }else{
          setGroup({...group,[name]:value})
        }
    }
    //handle search user
    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
       let value=e.target.value;
       setUsersFind(users.filter(btn=>btn.id!==userOnline.id&&btn.username.includes(value)))
    }
    //handle select user
    const handleSelected=(e:React.ChangeEvent<HTMLInputElement>, btn:User)=>{
      if(e.target.checked==true){
         setSelectedUser([...selectedUser,btn])
      }else{
        setSelectedUser(selectedUser.filter(user=>user.id!==btn.id))
      }
    };
    //create new group
    const createNewgroup=(e:React.FormEvent)=>{
       e.preventDefault();
       if(group.groupName.trim()==''||selectedUser.length==0){
         return;
       }
       let usersByIdSelected:string[]=selectedUser.map(btn=>btn.id);
       let newGroup:Group={
        ...group,
        avatar:"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
        id:uuidv4(),
        usersById:[...usersByIdSelected,userOnline.id],
        adminById:userOnline.id,
       }
       dispatch(addNewGroup(newGroup));
       resetGroup();
       setNewGroup(false);
       setSelectedUser([]);
    }
       
   //form create new group end

   //handle form view group
   const handleSearchGroup=(e:React.ChangeEvent<HTMLInputElement>)=>{
       if(e.target.value.trim()==''){
        setGroupsByUserOnline(groups);
       }
       setValueSearch(e.target.value)
       let newGroup=groups.filter(btn=>btn.groupName.includes(e.target.value.trim()));
       setGroupsByUserOnline(newGroup);
   }
  return (
    <div className='ml-[260px] flex'>
      {/* Header Left Start */}
       <div className='w-[25%] border-gray-200 rounded-[10px] p-[20px] min-h-[600px] shadow-md flex flex-col gap-[20px]'>
         {/* Group New start */}
         {newGroup&&
       <div className='w-[20%] border-gray-200 rounded-[10px] p-[20px] min-h-[600px] shadow-md flex flex-col gap-[10px] absolute bg-white left-[260px] z-[2]'>
         <i onClick={closeNewGroup} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-gray-400 top-[-10px] right-[10px] absolute"></i>
          <div className='text-[20px] font-bold'>Tạo Nhóm</div>
          <div className="flex items-center justify-center gap-[10px] hover:bg-[]rgb(240,242,245) rounded-[5px]">
            <Link to={`/user/${userOnline.id}`}><img className="w-[50px] h-[50px] rounded-[50%] cursor-pointer" src={userOnline.avatar} alt="" /></Link>
            <div>
              <Link to={`/user/${userOnline.id}`}><p className="font-bold cursor-pointer">{userOnline.username}</p></Link>
              <div className='text-gray-500'>Quản trị viên</div>
            </div>
          </div>  
          <form action="" className='flex felx-col gap-[10px]'>
            <input onChange={handleChange} type="text" name="groupName" id="" placeholder='Tên nhóm' className='p-[10px] text-[14px]' />
            {group.groupName==''&&<div className='text-[rgb(231,179,179)] text-[14px]'>Tên nhóm không được để trống</div>}
            <select onChange={handleChange} className='p-[10px] outline-none rounded-[5px]' name="private" id="">
              <option disabled value="">Chọn quyền riêng tư</option>
              <option value="1">Công khai</option>
              <option value="2">Riêng tư</option>
            </select>
            <input onChange={handleSearch} type="text" className='p-[10px] text-[14px]'placeholder='Mời bạn bè' />
            {selectedUser.length==0&&<div className='text-[14px] text-[rgb(231,179,179)]'>Chưa có thành viên nào được chọn</div>}
            {selectedUser.length>0&&<div className='text-[14px] text-gray-500'>Thành viên đã chọn:{selectedUser.map(item=>(
              <span key={item.id}>,{item.username} </span>
            ))}</div>}
            <div className='overflow-auto max-h-[200px] flex flex-col gap-[20px]'>
              {usersFind.map(btn=>(
                  <div key={btn.id} className='flex gap-[10px] items-center'>
                    <input onChange={(e)=>handleSelected(e,btn)} type="checkbox" />
                    <img className="w-[50px] h-[50px] rounded-[50%] cursor-pointer" src={btn.avatar} alt="" />
                    <div className='cursor-pointer hover:text-gray-600'>{btn.username}</div>
                  </div>
              ))}
            </div>
              <button onClick={createNewgroup} className='bg-[rgb(231,179,179)] rounded-[5px] p-[5px] text-white'>Gửi</button>
          </form>      
      </div>}
        {/* Group New end */}
          <div className='text-[30px] font-bold'>Nhóm</div>
          <div onClick={openNewGroup} className='flex gap-1 bg-[rgb(231,179,179)] text-white p-1 m-[10px] rounded-[5px] items-center hover:bg-[rgb(231,179,179,0.8)] cursor-pointer'>
              <i className='bx bx-plus'></i>
              <p>Thêm nhóm</p>
          </div>
          <div className='flex items-center gap-[10px]'>
                  <input onChange={handleSearchGroup} type="text" placeholder='Tìm kiếm nhóm' className='p-[10px] rounded-[10px] bg-[rgb(240,242,245)] text-[14px] w-[100%] ' value={valueSearch} />
          </div>
          <div className='overflow-auto'>
                {groupsByUserOnline.map(btn=>(
                      <NavLink key={btn.id}  style={active} to={`/group/${btn.id}`} className='flex items-center gap-[0px] rounded-[5px] hover:bg-[rgb(240,242,245)] px-[10px] py-[5px] cursor-pointer'>
                        <img className="w-[50px] h-[50px] rounded-[10px] cursor-pointer" src={btn.avatar} alt="" />
                        <div>
                          <p className="font-bold cursor-pointer">{btn.groupName}</p>
                          <div  className='text-gray-500'>{btn.usersById.length} thành viên</div>
                        </div>
                        </NavLink>
                ))}
          </div>
       </div>
       {/* header left end */}
      <Outlet/>
    </div>
  )
}
