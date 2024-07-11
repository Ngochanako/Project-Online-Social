import axios from "axios";
import { Group } from "../../interfaces";
import { createSlice } from "@reduxjs/toolkit";
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
        },
    }
)
export default groupsReducer.reducer;
