import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserAdmin, resetAdmin, setAdmin } from "../../services/userAdmin.service";
let initialUserAdmin:any={}
axios.get("http://localhost:3000/userLogin")
.then(response=>{
    initialUserAdmin=response.data;
})
.catch(err=>console.log(err))

const userAdminReducer=createSlice({
    name:"userAdmin",
    initialState:initialUserAdmin,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(setAdmin.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(resetAdmin.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(getUserAdmin.fulfilled,(state,action)=>{
            return action.payload
        })
    },
})
export default userAdminReducer.reducer;