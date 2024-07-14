import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { State, User } from '../../interfaces';
import { getUsers, updateUser } from '../../services/users.service';
import { activeModalDetailUser } from '../../store/reducers/ModalReducer';
import ModalDetailUser from '../../components/ModalDetailUser';
export default function ManageUsers() {
    const dispatch=useDispatch();
    const usersAPI=useSelector((state:State)=>state.users);
    const modal=useSelector((state:State)=>state.modal.detailUser);
    const [topFollowers,setTopFollower]=useState<any>('');
    const [user,setUser]=useState<User>({
        id:'',
        username:'',
        password:'',
        email:'',
        avatar:'',
        biography:'',
        gender:'',
        postsById:[],
        followersById:[],
        status:true,
        private:true,
        requestFollowById:[]
    })
    const [users,setUsersAdmin]=useState<User[]>([]);
    const [usersByTotal,setUsersByTotal]=useState<User[]>([]);
    const [page,setPage]=useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(1);
    const [valueSearch,setValueSearch]=useState<string>('');
    const [search,setSearch]=useState<string>('');
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:3000/users?_page=${page}&_limit=1&username_like=${search}`)
        .then(response=>setUsersAdmin(response.data))
        .catch(err=>console.log(err))
    },[page,valueSearch])
    useEffect(()=>{
        axios.get(`http://localhost:3000/users?username_like=${search}`)
        .then(response=>setUsersByTotal(response.data))
        .catch(err=>console.log(err))
    },[valueSearch])
    useEffect(()=>{
       if(usersAPI.length>0){
       let top=[...usersAPI].sort((a:User,b:User)=>{
           let x=a.followersById.length;
           let y=b.followersById.length;
           return y-x;
       });
      
       
       setTopFollower(top[0])
       }
    },[usersAPI])
    //set total Page
    useEffect(()=>{
       setTotalPages(Math.ceil(usersByTotal.length/1))
    },[usersByTotal])
    //view detail User
    const viewDetailUser=(btn:User)=>{
        dispatch(activeModalDetailUser());
        setUser(btn);
    }
    //block or unlock user
    const handleLockUser=(btn:User)=>{
        let newUser={...btn,status:!btn.status}
        dispatch(updateUser(newUser));
        setUsersAdmin(users.map(item=>item.id==btn.id?newUser:item))
    }
    //handle Change Value Input
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let value=e.target.value;
        setValueSearch(value);
    }
    //search User
    const searchUser=()=>{
        console.log(valueSearch);
        
        setSearch(valueSearch)
        setValueSearch('')
    }
    //pagination
    const setPageFirst=()=>{
        setPage(1);
    }
    const setPageLast=()=>{
        setPage(totalPages);
    }
    const setPagePrev=()=>{
        setPage(page-1);
    }
    const setPageNext=()=>{
        setPage(page+1);
    }
    const setPagePlus1=()=>{
        setPage(page+1);
    }
    const setPagePlus2=()=>{
        setPage(page+2);
    }
    const setPagePlus3=()=>{
        setPage(page+3);
    }
    const setPagePlus4=()=>{
        setPage(page+4);
    }
    const setPagePlus6=()=>{
        setPage(page+6);
    }
    const returnPage=()=>{
        if(totalPages==1){
            return true;
        }
        if(totalPages<=3){
            if(totalPages-page>2||totalPages-page<1){
                return true;
            }
            return false;
        }
        
        if(totalPages-page>2||totalPages-page<1){
            return true;
        }
        return false;
    }
  return (
       <main className='flex flex-col w-[100%]'>
        {modal&&<ModalDetailUser user={user}/>}
            {/* Header-Main Start */}
            <div className='flex justify-around items-center p-[20px]'>
            
              <div className=' flex gap-[20px] items-center'>
                {/* <p className='font-bold text-lg'>Add new post</p>
                <div className='flex items-center gap-1'>
                <i className='bx bx-plus'></i>
                <p>Add Content</p>
                </div> */}
              </div>
              <div className='relative'>
                  <input onChange={handleChange} type="text" placeholder='Search user' className='p-1' value={valueSearch}/>
                  <i onClick={searchUser} className='bx bx-search absolute right-0 top-1 bx-sm cursor-pointer'></i>
              </div>
            </div>
            {/* Header-Main End */}
            {/* Article Start */}
            <article className='py-[20px] px-[50px] bg-zinc-200'>
                <section className='flex justify-around'>
                   <div className='flex items-center bg-white py-2 px-[80px] gap-1 rounded-lg'>
                   <i className='bx bxs-user bx-sm text-lime-700'></i>
                   <div>
                    <p className='text-lg font-bold '>Total Users</p>
                    <p> {usersAPI.length} users</p>
                   </div>
                   </div>
                   <div className='flex items-center bg-white py-2 px-[80px] gap-1 rounded-lg'>
                   <img className='w-[20px] h-[20px] rounded-[50%]' src={topFollowers.avatar} alt="" />
                   
                   <div>
                    <p className='text-lg font-bold '>Top Followers</p>
                    <p className='flex'> {topFollowers.username}</p>
                   </div>
                   </div>
                </section>
                {/* Calculate End */}
                {/* Content Start */}
                <section className='bg-white rounded-lg p-[20px] mt-[50px] flex flex-col gap-2'>
                   <p className='text-lg font-bold'>List users</p>
                   <p className='text'><i className='bx bxs-alarm-exclamation'></i>There are {usersByTotal.length} users to be found </p>
                   <br />
                   <Table striped bordered hover className='rounded-[5px]'>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                        {users.map((btn,index)=>(
                           <tr key={index}>
                           <td>{index+1}</td>
                           <td className='flex justify-center'><img className='w-[50px] h-[50px] rounded-[50%]' src={btn.avatar} alt="" /></td>
                           <td>{btn.username}</td>
                           <td>{btn.email}</td>
                           <td><Button variant={btn.status?"outline-success":"outline-danger"}>{btn.status?'Active':"Disable"}</Button></td>
                           <td className='cursor-pointer'>
                               {!btn.status?<i onClick={()=>handleLockUser(btn)} className='bx bxs-lock-alt'></i>:<i onClick={()=>handleLockUser(btn)} className='bx bxs-lock-open-alt'></i>}                          
                               <i onClick={()=>viewDetailUser(btn)} className="fa-solid fa-eye ml-[20px]"></i>
                           </td>
                         </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className='flex gap-2 justify-center items-center text-orange-400'>
                <Pagination>
                    <Pagination.First active={page==1} onClick={setPageFirst}/>
                    <Pagination.Prev disabled={page==1} onClick={setPagePrev} />
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Ellipsis hidden={totalPages-page<=2} />
                    <Pagination.Item hidden={returnPage()} onClick={setPagePlus1}>{page+1}</Pagination.Item>
                    <Pagination.Item hidden={totalPages-page<=1} onClick={setPagePlus2}>{page+2}</Pagination.Item>
                    <Pagination.Item hidden={totalPages-page<=2}  onClick={setPagePlus3} >{page+3}</Pagination.Item>
                    <Pagination.Item hidden={totalPages-page<=3} onClick={setPagePlus4}>{page+4}</Pagination.Item>

                    <Pagination.Ellipsis hidden={totalPages-page<=4} />
                    <Pagination.Item hidden={totalPages-page<=5} active={page===totalPages} onClick={setPagePlus6}>{page+6}</Pagination.Item>
                    <Pagination.Next disabled={page===totalPages} onClick={setPageNext} />
                    <Pagination.Last active={page===totalPages} onClick={setPageLast} />
                </Pagination>
                  </div>
                </section>
            </article>
          </main>
    
  )
}
