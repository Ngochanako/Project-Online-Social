import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces";
import { addNewPost } from "../../services/posts.service";

const initialPosts:Post[]=[];
const postsReducer=createSlice({
    name:'posts',
    initialState:initialPosts,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(addNewPost.fulfilled,(state,action:PayloadAction<Post>)=>{
            state.push(action.payload);
        })
    },
})