import { createSlice } from "@reduxjs/toolkit"
import { Post, User } from "../../interfaces";
import { getUserLogin, resetUserLogin, setUserLogin } from "../../services/userLogin.service";
import { updateUser } from "../../services/user.service";
import axios from "axios";
let initialUserLogin:User={
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
axios.get("http://localhost:3000/userLogin")
.then(response=>{
        initialUserLogin=response.data;
       })
.catch(err=>console.log(err))
const UserLoginReducer=createSlice({
    name:"userLogin",
    initialState:initialUserLogin,
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getUserLogin.fulfilled,(state,action)=>{
           let newPosts:Post[]=[...action.payload.posts];             
            return {...action.payload,posts:newPosts.sort((a:Post,b:Post)=>b.date-a.date)};
        })
        .addCase(setUserLogin.fulfilled,(state,action)=>{
            return action.payload;           
        })
        .addCase(resetUserLogin.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            return action.payload;
        })
    },
})
export default UserLoginReducer.reducer;