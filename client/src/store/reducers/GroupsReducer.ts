import axios from "axios";
import { Group } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { addNewGroup, getGroups } from "../../services/groups.service";
let initialGroups:Group[]=[]
axios.get("http://localhost:3000/groups")
.then(response=>{
    initialGroups=response.data;
})
.catch(err=>console.log(err))
const groupsReducer=createSlice(
    {
        name:"groups",
        initialState:initialGroups,
        reducers:{},
        extraReducers(builder) {
            builder
            .addCase(addNewGroup.fulfilled,(state,action)=>{
                state.push(action.payload)
            })
            .addCase(getGroups.fulfilled,(state,action)=>{
                return action.payload;
            })
        },
    }
)
export default groupsReducer.reducer;
