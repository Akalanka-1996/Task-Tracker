import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

import {TaskData} from '../TaskData'

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {value: TaskData},
    reducers: {
        addTask: (state, action) => {
            state.value.push(action.payload);
            console.log(action.payload)
        },
        deleteTask: (state, action) => {
            console.log("delete delete")
            console.log(action.payload)
            state.value = state.value.filter((task) => task.id !== action.payload)
        }
        
    }
})


export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;