import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { activeModalAllComment, activeModalAvatar, activeModalPost } from '../../store/reducers/ModalReducer';
import { Group, Post, State, User } from '../../interfaces';
import { getUserLogin } from '../../services/userLogin.service';
import { getUsers } from '../../services/users.service';
import { getPosts } from '../../services/posts.service';
import { setPost } from '../../store/reducers/PostReducer';
import { getGroups, updateGroups } from '../../services/groups.service';
import { setGroup } from '../../store/reducers/GroupReducer';
import { activeLoading } from '../../store/reducers/LoadingReducer';
export default function GroupDetail() {
    const userOnline:User=useSelector((state:State)=>state.userLogin);
    const users:User[]=useSelector((state:State)=>state.users);
    const posts=useSelector((state:State)=>state.posts);
    const groups=useSelector((state:State)=>state.groups);
    const [viewMemberOfGroup,setViewMember]=useState<boolean>(false);
    const [addMemberGroup,setAddMember]=useState<boolean>(false);
    const [usersBySearch,setUsersBySearch]=useState<User[]>(users);
    const isLoader=useSelector((state:State)=>state.loading)
    const [group,setGroupPage]=useState<Group>({
      id:'',
    groupName:'',
    usersById:[],
    status:true,
    avatar:'',
    private:false,
    adminById:'',
    })
    const [postsByGroupId,setPostsByGroupId]=useState<Post[]>([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    //load Page when user is not login or login
    useEffect(()=>{ 
      axios.get(`http://localhost:3000/users/${userOnline.id}`)
    .then(response=>{
        if(response.data.id==''||response.data.status==false){
           navigate('/preLogin')        
        }
        })
    .catch(err=>console.log(err))
    })
     
    useEffect(()=>{
      dispatch(getUserLogin())
      dispatch(getUsers());
      dispatch(getGroups());
    },[])
    useEffect(()=>{
      dispatch(getPosts());
    },[])
    //get posts by UserOnline
    
    useEffect(()=>{
      
      
      axios.get(`http://localhost:3000/groups/${id}`)
      .then(response=>{
       setGroupPage(response.data)
        
      })
      .catch(err=>console.log(err)) 
    },[groups,id]) 
    useEffect(()=>{
      axios.get(`http://localhost:3000/posts?idGroup=${group.id}`)
      .then(response=>setPostsByGroupId(response.data))
      .catch(err=>console.log(err)) 
    },[group,posts])     
    // open modal change Avatar
    const openModalAvatar=()=>{
      dispatch(setGroup(group))
      dispatch(activeModalAvatar({type:'group',status:true}));
     
    }
    //open Modal Post
    const openModalPost=(idPost:string)=>{
        axios.get(`http://localhost:3000/posts?id=${idPost}`)
        .then(response=>dispatch(setPost(response.data[0])))
        .then(()=>dispatch(activeModalAllComment()))
        .catch(err=>console.log(err))
    }
   //open modal add New Post
   const openAddNewPost=()=>{
      dispatch(activeModalPost({type:'group',status:true}))
      dispatch(setGroup(group))
   }
  //view Member
  const viewMembers=()=>{
    setViewMember(!viewMemberOfGroup)
  }
  //add Member Of Group
  const openNewMember=()=>{
    setAddMember(!addMemberGroup)
  }
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
     setUsersBySearch(users.filter(btn=>btn.username.includes(e.target.value)))
  }
  const addNewMember=(id:string)=>{
    if(group.usersById.includes(id)){
      return;
    }    
    console.log(5);
    
    dispatch( updateGroups({...group,usersById:[...group.usersById,id]}))
     dispatch(setGroup({...group,usersById:[...group.usersById,id]}))
     setAddMember(false)
  }
  return (
    <div className='p-[50px] '>
      
        <header className='px-[40px] flex gap-[50px] items-center'>
            <div>
              {isLoader&&<div className='loader absolute top-[100px] right-[550px] '></div>}
            <img onClick={openModalAvatar} className='cursor-pointer w-[150px] h-[150px] rounded-[50%]' src={group.avatar} alt="" />
            </div>
            <div className='flex flex-col gap-[20px]'>
                <div className='flex gap-[20px] items-center'>
                    <div className='text-[20px]'>{group.groupName}</div>
                    {userOnline.id===group.adminById&&<div className='flex gap-[20px]'>
                  <Link to={'edit'}> <Button className='opacity-40 text-[14px]' variant="dark">Chỉnh sửa </Button></Link> 
                    <Button className='opacity-40 text-[14px]' variant="dark">Xem kho lưu trữ</Button></div>}
                </div>
                <div className='flex gap-[40px]'>
                    <div><span className='font-bold'>{postsByGroupId.length}</span> bài viết</div>
                    <div onClick={viewMembers} className='cursor-pointer'><span className='font-bold'>{group.usersById.length}</span> thành viên</div>
                    {viewMemberOfGroup&&
                    <div className='absolute flex flex-col gap-[10px] bg-gray-200 rounded-[10px] shadow-sm p-[10px] right-[180px] top-[130px]'>
                      {group.usersById.map(item=>(
                        <div className='flex gap-[5px] items-center'>
                            <img className='w-[20px] h-[20px] rounded-[50%]' src={users.find(user=>user.id==item)?.avatar} alt="" />
                            <div>{users.find(user=>user.id==item)?.username}</div>
                        </div>
                      ))}
                    </div> }
                </div>
                <div className='flex gap-[10px]'>
                  {group.usersById.includes(userOnline.id)&&
                    <div onClick={openAddNewPost} className='flex gap-1 bg-[rgb(231,179,179)] text-white p-1 m-[10px] rounded-[5px] items-center hover:bg-[rgb(231,179,179,0.8)]  cursor-pointer'>
                        <i className='bx bx-plus'></i>
                        <p>Thêm chia sẻ</p>
                    </div>}
                  {group.adminById==userOnline.id&&
                    <div onClick={openNewMember} className='flex gap-1 bg-[rgb(231,179,179)] text-white p-1 m-[10px] rounded-[5px] items-center hover:bg-[rgb(231,179,179,0.8)]  cursor-pointer'>
                        <i className='bx bx-plus'></i>
                        <p>Thêm thành viên</p>
                        
                    </div>}
                    {addMemberGroup&&
                        <div className="absolute top-[190px] right-[80px] w-[250px] h-[300px] overflow-auto  bg-white flex flex-col gap-[10px] rounded-[10px] shadow-lg">
                            <input onChange={handleSearch} type="text" className=" fixed mx-[20px] mt-[10px] bg-[rgb(239,239,239)] p-[10px] text-[14px]" placeholder="Tìm kiếm người dùng" />
                            <hr className=""/>
                            <div className="flex flex-col gap-[20px] px-[10px] mt-[50px]">
                                {usersBySearch.map(btn=>(
                                    <div onClick={()=>addNewMember(btn.id)} className='flex items-center cursor-pointer hover:bg-gray-200'>
                                    <img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatar} alt="" />
                                    <div>
                                    <p className=''>{btn.username}</p>
                                    <p className="text-gray-500 text-[14px]">{btn.followersById.length} người theo dõi</p>
                                    </div>
                                </div>
                                ))}
                  
                            </div>                      
                        </div>}
                </div>
            </div>
            
        </header>
        
        {/* Header end */}
        <div className='w-[100%] mt-[50px]' style={{border:"1px solid rgb(239,239,239)"}}></div>
        <div className='my-[20px] flex justify-center gap-[50px]'>
        {group.private&&<i className="fa-solid fa-lock"></i>}
        {!group.private&&<i className="fa-solid fa-unlock"></i>}
            <div className='flex items-center gap-[10px]  text-black cursor-pointer'>
            <i className='bx bx-menu bx-border'></i>
            <div className='uppercase'>Bài viết</div>
            </div>
            <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
            <i className='bx bx-home-alt-2'></i>
            <div className='uppercase'>Đã lưu</div>
            </div>
            <div className='flex items-center gap-[10px] text-gray-500 cursor-pointer'>
            <i className='bx bx-user bx-border' ></i>
            <div className='uppercase'>Được gắn thẻ</div>
            </div>
        </div>
      {/* Post start */}
      {group.private&&!group.usersById.includes(userOnline.id)?(
         <div className='flex flex-col items-center justify-center gap-[20px]'>
              <p className='font-bold text-[16px]'>Nhóm riêng tư</p>
              <p className='text-orange-500'>Bạn có muốn tham gia nhóm để xem bài viết?</p>
         </div> 
      ):(
        <div className='grid grid-cols-3 gap-[5px]'>
        {postsByGroupId.sort((a,b)=>b.date-a.date).map((post:Post)=>(
           <img key={post.id} onClick={()=>openModalPost(post.id)} className='h-[200px] w-[200px] hover:opacity-85 cursor-pointer' src={post.images[0]} alt="" />
       ))}        
      </div>
      )}
      {/* Post end */}
    </div>
  )
}
