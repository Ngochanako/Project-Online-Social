import { createAsyncThunk } from "@reduxjs/toolkit";
import { Group } from "../interfaces";
import axios from "axios";

export const addNewGroup:any=createAsyncThunk(
    "groups/add",
    async(group:Group)=>{
        const response=await axios.post("http://localhost:3000/groups",group);
        return response.data;
    }
)