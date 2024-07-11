import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, registerUser } from '../../services/users.service';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/reducers/UserReducer';
import axios from 'axios';
import { State, User } from '../../interfaces';

export default function Register() {
  //Initialization
  const navigate=useNavigate();
  const users:User[]=useSelector((state:State)=>state.register);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
  },[users]);
  const [errorEmail,setErrorEmail]=useState<any>('');
  const [errorPassword,setErrorPassword]=useState<any>('');
  const [errorUsername,setErrorUsername]=useState<any>('');
  const [user,setUserRegister]=useState<User>({
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
    private:false,
    requestFollowById:[]
  })
  //reset User
  const resetUser=()=>{
    setUser({
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
    private:false,
    requestFollowById:[]
    })
  }
  //Validate Email
  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };
  //Validate Password
  const validatePassword = (password:string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  };
  //handle data Input
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     let {name,value}=e.target;
     //validate email
     if(name==='email'){     
        if (!validateEmail(value)) {
         setErrorEmail('Incorrect Email Format');      
        } else{
          axios.get(`http://localhost:3000/users?email=${value}`)
          .then(response=>{
            if(response.data.length>0){
              setErrorEmail('Email has already registered')
            }else{
              setErrorEmail('');
            }
          })
          .catch(err=>console.log(err))
        }
     }
     //validate username
     if(name==='username'){
      axios.get(`http://localhost:3000/users?username=${value}`)
          .then(response=>{
            if(response.data.length>0){
              setErrorUsername('Username has already registered')
            }else{
              setErrorUsername('');
            }
          })
          .catch(err=>console.log(err))
     }
     //validate password
     if(name==='password'){
      if(!validatePassword(value)){
        setErrorPassword('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number');
        return;
      }
      setErrorPassword('') 
     }
     setUserRegister({...user,[name]:value});
  }
  ///registerUser
  const register=(e:React.FormEvent)=>{
    e.preventDefault();   
    //email is empty
    if(!user.email){ 
      const newError= 'Email is required';
      setErrorEmail(newError)   
      return;
    }
    //username is empty
    if(!user.username){ 
      const newError= 'Username is required';
      setErrorUsername(newError)   
      return;
    }
     //password is empty
     if(!user.password){ 
      const newError= 'Password is required';
      setErrorPassword(newError)   
      return;
    }
    // register 
     const newUser:User={...user,id:uuidv4(),avatar:'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'};
     dispatch(registerUser(newUser));
     dispatch(setUser(newUser));
     setTimeout(() => {
      navigate('/login');
     }, 1000);
  }
  return (
    <div className='register flex items-center justify-center'>
      <div className='w-[350px] border-gray-300 h-[600px] border-solid border-1 p-[30px] flex flex-col gap-[20px] mt-[10px]'>
        <p className='text-[rgb(115,115,115)] font-[600] text-center'>Sign up to see photos and videos from your friends</p>
        <Button className='bg-[rgb(0,149,246)] border-transparent' variant="primary">Login with Facebook </Button>
        <div className='register-hr'>
            <div className='hr' ></div>
            <div className='text-[rgb(115,115,115)] font-[600]'>OR</div>
            <div className='hr'></div>
        </div>
        <form action="" className='flex flex-col gap-[10px]'>
                <input onChange={handleChange} name='email' type="email" placeholder='Email' />
                <Form.Text className="text-muted">
                  <span className='text-red-500'> {errorEmail}</span>
                </Form.Text>
                <input onChange={handleChange} name='username' type="text" placeholder='Username' />
                <Form.Text className="text-muted">
                  <span className='text-red-500'> {errorUsername}</span>
                </Form.Text>
                <input onChange={handleChange} name='password' type='password' placeholder='Password' />
                <Form.Text className="text-muted">
                  <span className='text-red-500'> {errorPassword}</span>
                </Form.Text>
                 <p className='text-register'>People who use our service may have uploaded your contact information to Instagram. Learn More</p> 
                 <p className='text-register'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                 <Button onClick={register} className='bg-[rgb(0,149,246)] border-transparent' variant="primary">Sign up </Button>
        </form>
        <p className='text-gray-700 font-[500] text-center'>Have an account? <span><a className='text-blue-500' href="/login">Login</a></span></p>
      </div>
    </div>
  )
}
