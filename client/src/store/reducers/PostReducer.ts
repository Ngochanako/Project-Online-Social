import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces";

const initialPost:Post={
    id:'',
    idUser:'',
    avatarUser:'',
    userNameUser:'',
    detail:'',
    date:0,
    fullDate:'',
    images:[],
    commentsById:[],
    favouristUsersById:[], 
    idGroup:null,
    status:true
}
const postReducer=createSlice({
    name:"post",
    initialState:initialPost,
    reducers:{
        setPost:(state,action)=>{
            return action.payload;
        },
        resetPost:state=>initialPost
    }
})
export const {setPost,resetPost}=postReducer.actions;
export default postReducer.reducer;