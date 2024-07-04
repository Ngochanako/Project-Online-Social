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