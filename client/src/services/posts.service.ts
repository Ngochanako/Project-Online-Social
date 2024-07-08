import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../interfaces";

export const addNewPost:any=createAsyncThunk(
    "posts/addNew",
    async(post:Post)=>{
        const response=await axios.post("http://localhost:3000/posts",post);
        return response.data;
    }
)
export const getPosts:any=createAsyncThunk(
    "posts/getPosts",
    async()=>{
        const response=await axios.get("http://localhost:3000/posts");
        return response.data;
    }
)
export const updatePosts:any=createAsyncThunk(
    "posts/updatePosts",
    async(post:Post)=>{
        const response=await axios.put(`http://localhost:3000/posts/${post.id}`,post);
        
        return response.data;
    }
)