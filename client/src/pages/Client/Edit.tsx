import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { State, User } from '../../interfaces';
import { getUserLogin, setUserLogin } from '../../services/userLogin.service';
import { activeModalAvatar } from '../../store/reducers/ModalReducer';
import { updateUser } from '../../services/users.service';
export default function Edit() {
    const userOnline=useSelector((state:State)=>state.userLogin);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [user,setUser]=useState<User>(userOnline);
    useEffect(()=>{
        dispatch(getUserLogin());
        axios.get("http://localhost:3000/userLogin")
            .then(response=>{
                if(response.data.id!==''){  
                    setUser(response.data);    
                }else{
                    navigate('/login')           
                }
                })
            .catch(err=>console.log(err))
            },[])
    //change Avatar
    const changeAvatar=()=>{
        dispatch(activeModalAvatar());
    }


    //handle Change
    const handleChangeBiography=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
         const value=e.target.value;
         setUser({...user,biography:value});
    }
    const handleChangeGender=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const value=e.target.value;
        
        setUser({...user,gender:value});
        
    }
    const handleChangePrivate=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.checked;
        setUser({...user,private:value});
        
    }
    //update Personal
    const updatePersonal=(e:React.FormEvent)=>{
        e.preventDefault();
        dispatch(setUserLogin(user));
        dispatch(updateUser(user));
    }
  return (
    <div className='py-[50px] flex flex-col gap-[50px] px-[100px] ml-[230px]'>
      <header className='flex items-center justify-between py-[20px] px-[50px] bg-[rgb(239,239,239)] rounded-[20px]'>
        <div className='flex items-center gap-[10px]'>
             <img className='w-[80px] h-[80px] rounded-[50%]' src={userOnline.avatar} alt="" /> 
            <div className='font-bold'>{userOnline.username}</div>
        </div>
        <button onClick={changeAvatar} className='bg-[rgb(0,149,246)] hover:bg-[rgb(0,149,246,0.8)] text-white text-[16px] p-[10px] rounded-[5px]'>Đổi ảnh đại diện</button>
      </header>
      <form action="" className='flex flex-col gap-[50px]'>
      <div className='flex flex-col gap-[20px]'>
         <p className='font-bold'>Tiểu sử</p>
         <textarea onChange={handleChangeBiography} value={user.biography} name="biography" id="" maxLength={150} className='text-[14px] placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[80%] max-h-[100px] resize-none' placeholder='Thêm tiểu sử'></textarea>
      </div>
      <div className='flex flex-col gap-[20px]'>
         <p className='font-bold'>Giới tính</p>
         <select onChange={handleChangeGender} name="gender" id="" className='p-[10px] focus:border-gray-600 outline-none' value={user.gender}>
            <option value="">Không muốn tiết lộ</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
         </select>
      </div>
      <div className='flex flex-col gap-[20px]'>
         <p className='font-bold'>Quyền riêng tư của tài khoản</p>
         <div className='flex justify-between'>
            <p className='text-gray-600'>Tài khoản riêng tư</p>
            <input onChange={handleChangePrivate} type="checkbox" name='private' checked={user.private}/>
         </div>
         <p className='text-[14px] text-gray-600'>Khi bạn đặt tài khoản ở chế độ công khai, bất cứ ai trên hoặc ngoài Instagram cũng có thể xem trang cá nhân và bài viết của bạn, ngay cả khi họ không có tài khoản Instagram.
         Khi bạn đặt tài khoản ở chế độ riêng tư, chỉ những người theo dõi được phê duyệt mới có thể xem nội dung mà bạn chia sẻ – bao gồm ảnh hoặc video trên trang vị trí và trang hashtag, cũng như danh sách theo dõi và danh sách người theo dõi của bạn.</p>
      </div>
      <button onClick={updatePersonal} className='bg-[rgb(0,149,246)] text-white text-[16px] p-[10px] rounded-[5px] w-[200px] hover:bg-[rgb(0,149,246,0.8)]'>Gửi</button>
      </form>
    </div>
  )
}
