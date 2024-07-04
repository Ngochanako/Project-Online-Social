import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import { getUsers, updateUser } from "../../services/user.service";
import { registerUser } from "../../services/user.service";
import axios from "axios";

const initialRegisterUsers:User[]=[];
const registerReducer=createSlice({
    name:'register',
    initialState:initialRegisterUsers,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getUsers.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.push(action.payload);
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            return state.map(item=>item.id===action.payload.id?{...item,avatar:action.payload.avatar}:item)
        })
    }
})
export default registerReducer.reducer;