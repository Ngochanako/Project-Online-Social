import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../interfaces";
import { getUserLogin, resetUserLogin, setUserLogin } from "../../services/userLogin.service";

const initialUserLogin:User={
    id:'',
    username:'',
    password:'',
    email:'',
    avatar:'',
    biography:'',
    gender:'',
    posts:[],
    followersById:[],
    followUsersById:[],
    status:true,
}
const UserLoginReducer=createSlice({
    name:"userLogin",
    initialState:initialUserLogin,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getUserLogin.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(setUserLogin.fulfilled,(state,action)=>{
            return action.payload;           
        })
        .addCase(resetUserLogin.fulfilled,(state,action)=>{
            return action.payload;
        })
    },
})
export default UserLoginReducer.reducer;