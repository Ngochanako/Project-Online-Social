import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserLogin:any=createAsyncThunk(
    "users/getUserLogin",
    async()=>{
        const response=await axios.get("http://localhost:3000/userLogin");
        
        return response.data;
    }
)
export const setUserLogin:any=createAsyncThunk(
     "users/setUserLogin",
     async(user)=>{
        const response=await axios.put("http://localhost:3000/userLogin",user);
        return response.data;
     }
)
export const resetUserLogin:any=createAsyncThunk(
    "users/resetUser",
    async()=>{
        const response= await axios.put("http://localhost:3000/userLogin",
            {
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
        )
        
        return response.data;
    }
)