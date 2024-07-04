import { createSlice } from "@reduxjs/toolkit";
import { Modal } from "../../interfaces";

const initialModal:Modal={
    comments:false,
    avatar:false,
    post:false,
    uploadPost:false,
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
        }
    }
})
export const{activeModalAllComment,disableModalAllComment,activeModalAvatar,disableModalAvatar,activeModalPost,disableModalPost,activeModalUploadPost,disableModalUploadPost}=modalReducer.actions;
export default modalReducer.reducer;
