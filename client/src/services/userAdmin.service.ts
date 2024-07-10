import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAdmin:any=createAsyncThunk(
    "admin/setAdmin",
    async(admin)=>{
        const response=await axios.put("http://localhost:3000/userAdmin",admin);
        return response.data;
    }
)
export const getAdmin:any=createAsyncThunk(
    "admin/getAdmin",
    async()=>{
        const response=await axios.get("http://localhost:3000/userAdmin");
        return response.data;
    }
)
export const resetAdmin:any=createAsyncThunk(
    "admin/resetAdmin",
    async()=>{
        const response=await axios.put("http://localhost:3000/userAdmin",{
            "username":"",
            "password":"",
            "email":"",
            "id":"",
            "avatar": "",
            "biography": "",
            "gender": "",
            "postsById": [
            ],
            "followersById": [],
            "status": true
        });
        return response.data;
    }
)
