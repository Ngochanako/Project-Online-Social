import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import axios from "axios";

export const registerUser:any=createAsyncThunk(
    "users/register",
    async(user:User)=>{
        const response=await axios.post("http://localhost:3000/users",user);
        return response.data;
    }
)

export const getUsers:any=createAsyncThunk(
    "users/getUsers",
    async()=>{
        const response= await axios.get("http://localhost:3000/users");
        return response.data;
    }
)