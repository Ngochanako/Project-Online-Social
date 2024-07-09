import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

const initialUser:User={
    id:'',
    username:'',
    password:'',
    email:'',
    avatar:'',
    biography:'',
    gender:'',
    postsById:[],
    followersById:[],
    status:true,
    private:false,
}
const userReducer=createSlice({
    name:'user',
    initialState:initialUser,
    reducers:{
       setUser:(state,action:PayloadAction<User>)=>{
           return action.payload;
       },
       resetUser:(state)=>{
         return initialUser;
       }
    }
})
export const {setUser,resetUser}=userReducer.actions;
export default userReducer.reducer;