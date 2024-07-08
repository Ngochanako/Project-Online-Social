import { createSlice } from "@reduxjs/toolkit";
import { Modal } from "../../interfaces";

const initialModal:Modal={
    comments:false,
    avatar:false,
    post:false,
    uploadPost:false,
    updatePost:false,
};
const modalReducer=createSlice({
    name:"modal",
    initialState:initialModal,
    reducers:{
        activeModalAllComment:(state)=>{          
            state.comments=true;
        },
        disableModalAllComment:(state)=>{
            state.comments=false;
        },
        activeModalAvatar:(state)=>{
            state.avatar=true;
        },
        disableModalAvatar:(state)=>{
            state.avatar=false;
        },
        activeModalPost:(state)=>{
            state.post=true;
        },
        disableModalPost:(state)=>{           
            state.post=false;
        },
        activeModalUploadPost:(state)=>{
            state.uploadPost=true;
        },
        disableModalUploadPost:(state)=>{
            state.uploadPost=false;
        },
        activeModalUpdatePost:(state)=>{
            state.updatePost=true;
        },
        disableModalUpdatePost:(state)=>{
            state.updatePost=false;
        }
    }
})
export const{activeModalAllComment,disableModalAllComment,activeModalAvatar,disableModalAvatar,activeModalPost,disableModalPost,activeModalUploadPost,disableModalUploadPost,activeModalUpdatePost,disableModalUpdatePost}=modalReducer.actions;
export default modalReducer.reducer;
