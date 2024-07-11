import React from 'react'
import { Link } from 'react-router-dom'
export default function PreLogin() {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-white'>
    <div className='flex flex-col gap-[50px] items-center justify-center bg-[rgb(48,48,48)] text-white font-bold top-0 bottom-0 right-0 left-0 absolute'>
        <i className='bx bxl-instagram bx-border-circle border-white text-[40px]'></i>
        <div className='text-center text-[18px]'>
        <p>Log into Instagram.</p>
        <br />
        <p> Log in to see photos and videos from friends and discover other accounts you'll love.</p>
       </div>
       <div className='flex gap-[50px]'>
        <button className='bg-[rgb(0,149,246)] px-[20px] py-[5px] rounded-[10px] hover:bg-[rgb(0,149,246,0.8)]'><Link to={'/login'}>Log in</Link></button>
        <button className='text-[rgb(0,149,246)] hover:text-[rgb(0,149,246,0.8)]'><Link to={'/register'}>Sign up</Link></button>
       </div>
    </div>
    </div>
  )
}
