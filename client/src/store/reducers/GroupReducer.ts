import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../interfaces";

const initialGroup:Group={
    id:'',
    groupName:'',
    usersById:[],
    status:true,
    avatar:'',
    private:true,
    adminById:'',
}
const groupReducer=createSlice({
    name:"group",
    initialState:initialGroup,
    reducers:{
        setGroup:(state,action)=>{
            return action.payload;
        },
        resetGroup:state=>initialGroup
    }
})
export const {setGroup,resetGroup}=groupReducer.actions;
export default groupReducer.reducer;