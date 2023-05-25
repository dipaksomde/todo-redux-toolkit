import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";


const reduxStore = configureStore({
    reducer : {
        todo: todoSlice
    }
})

export default reduxStore