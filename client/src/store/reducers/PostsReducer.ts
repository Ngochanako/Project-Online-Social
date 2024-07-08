import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces";
import { addNewPost, getPosts, updatePosts } from "../../services/posts.service";
import { setPost } from "./PostReducer";

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
        .addCase(getPosts.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(updatePosts.fulfilled,(state,action)=>{
            return state.map(btn=>btn.id===action.payload.id?action.payload:btn);
        })
    },
})
export default postsReducer.reducer;