import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import { getUsers, updateUser } from "../../services/users.service";
import { registerUser } from "../../services/users.service";
import axios from "axios";

const initialUsers:User[]=[];
const registerReducer=createSlice({
    name:'register',
    initialState:initialUsers,
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
            return state.map(item=>item.id===action.payload.id?action.payload:item)
        })
    }
})
export default registerReducer.reducer;