import { createAsyncThunk } from "@reduxjs/toolkit";
import { Group } from "../interfaces";
import axios from "axios";

export const addNewGroup:any=createAsyncThunk(
    "groups/add",
    async(group:Group)=>{
        const response=await axios.post("http://localhost:3000/groups",group);
        return response.data;
    }
)
export const getGroups:any=createAsyncThunk(
    "groups/get",
    async(group:Group)=>{
        const response=await axios.get("http://localhost:3000/groups?status=true");
        return response.data;
    }
)
export const updateGroups:any=createAsyncThunk(
    "posts/updatePosts",
    async(group:Group)=>{
        const response=await axios.put(`http://localhost:3000/posts/${group.id}`,group);
        
        return response.data;
    }
)