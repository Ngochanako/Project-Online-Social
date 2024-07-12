import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const getUserLogin:any=createAsyncThunk(
    "users/getUserLogin",
    async()=>{
        const response=await axios.get("http://localhost:3000/userLogin?status=true");
        
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
export const updateFollowersUserLogin:any=createAsyncThunk(
    "users/updateFollowersUserLogin",
    async(user)=>{
        const response=await axios.put("http://localhost:3000/userLogin",user);
        return response.data;
     }
)
