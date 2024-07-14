import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import { Group, State } from '../../interfaces';
import { getGroups, updateGroups } from '../../services/groups.service';
import { getUsers } from '../../services/users.service';
export default function ManageGroups() {
    const dispatch=useDispatch();
    const [groups,setgroups]=useState<Group[]>([])
    const [page,setPage]=useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(1);
    const groupsAPI=useSelector((state:State)=>state.groups);
    const users=useSelector((state:State)=>state.users)
    useEffect(()=>{
      dispatch(getGroups());
      dispatch(getUsers())
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:3000/groups?_page=${page}&_limit=2`)
        .then(response=>setgroups(response.data))
        .catch(err=>console.log(err))
    },[groups])
    //set total Page
    useEffect(()=>{
       setTotalPages(Math.ceil(groupsAPI.length/2))
    },[groupsAPI])
   //handle Lock Post
    const handleLockGroup=(btn:Group)=>{
       let newGroup={
        ...btn,
        status:!btn.status
       }
       dispatch(updateGroups(newGroup));
       console.log(groups.map(item=>item.id===newGroup.id?newGroup:item));
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
           
            {/* Article Start */}
            <article className='py-[20px] px-[50px] bg-zinc-200 min-h-[600px]'>
                {/* Content Start */}
                <section className='bg-white rounded-lg p-[20px] mt-[20px] flex flex-col gap-2'>
                   <p className='text-lg font-bold'>List groups</p>
                   <p className='text'><i className='bx bxs-alarm-exclamation'></i>There are {groupsAPI.length} groups to be found </p>
                   <br />
                   <Table striped bordered hover className='rounded-[5px]'>
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Admin</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                        {groups.map((btn,index)=>(
                           <tr key={index}>
                           <td>{index+1}</td>
                           <td>{users.find(item=>item.id===btn.adminById)?.username}</td>
                           <td><img className='w-[100px] h-[100px] rounded-[5px]' src={btn.avatar} alt="" /></td>
                           <td>{btn.groupName}</td>
                          
                           
                           <td><Button variant={btn.status?"outline-success":"outline-danger"}>{btn.status?'Active':"Disable"}</Button></td>
                           <td className='cursor-pointer'>
                               {!btn.status?<i onClick={()=>handleLockGroup(btn)} className='bx bxs-lock-alt'></i>:<i onClick={()=>handleLockGroup(btn)} className='bx bxs-lock-open-alt'></i>}                          
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

