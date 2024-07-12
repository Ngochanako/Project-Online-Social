import axios from "axios";
import { Group } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { addNewGroup, getGroups, updateGroups } from "../../services/groups.service";
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
            .addCase(updateGroups.fulfilled,(state,action)=>{
                return state.map(btn=>btn.id===action.payload.id?action.payload:btn)
            })
        },
    }
)
export default groupsReducer.reducer;
