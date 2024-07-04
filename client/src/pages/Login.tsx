import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { State, User } from '../interfaces';
import axios from 'axios';
import { setUserLogin } from '../services/userLogin.service';
import { resetUser } from '../store/reducers/UserReducer';
export default function Login() {
  //Initiliazation
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const userAPI=useSelector((state:State)=>state.user);
   const [user,setUser]=useState<User>(userAPI);
   const [error,setError]=useState<string>('');
   //handle Change Input
   const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     const {name,value}=e.target;
     setUser({...user,[name]:value});
   }
   //login
   const login=(e:React.FormEvent)=>{
      e.preventDefault();
      axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`)
      .then((response)=>{       
        if(response.data.length>0){        
          dispatch(setUserLogin(response.data[0]))
          dispatch(resetUser());
          setTimeout(()=>{
            navigate('/');
          },1000)
          }else{
            setError('Password or Email is incorrect')
          }
      })
      .catch( err=>console.log(err))
   }
  return (
    <div className='register flex items-center justify-center text-[14px]'>
      <div className='w-[350px] border-gray-300 h-[400px] border-solid border-1 p-[50px] flex flex-col gap-[20px] mt-[20px]'>
        <form action="" className='flex flex-col gap-[10px]'>
            <input required onChange={handleChange} name='email' type="email" placeholder='Email' value={user.email} />
            <input required onChange={handleChange} name='password' type="password" placeholder='Password' value={user.password}/>
            <Form.Text className="text-muted">
                  <span className='text-red-500'> {error}</span>
            </Form.Text>
            <Button onClick={login} className='bg-[rgb(0,149,246)] border-transparent' variant="primary">Log in </Button>
        </form>
        <div className='register-hr'>
            <div className='hr' ></div>
            <div className='text-[rgb(115,115,115)] font-[600]'>OR</div>
            <div className='hr'></div>
        </div>
        <div className='flex flex-col items-center gap-[10px]'>
            <div className='flex items-center gap-[10px] text-[rgb(56,81,133)]'>
                <i className="fa-brands fa-facebook"></i>
                <div>Login with Facebook</div>
            </div>
            <div className='text-blue-700'>Forgot Password?</div>
        </div>
        <p className='text-gray-700 font-[500] text-center'>Don't have an account? <Link to={'/register'}><span className='text-blue-500 font-bold'>Sign up</span></Link></p>
      </div>
    </div>
  )
}
