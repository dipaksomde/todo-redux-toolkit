import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const addTodoAction = createAsyncThunk("todo/add", async (todoData, {rejectWithValue}) => {
try {
    const {data} = await api.post("/todo", todoData)
    return true
} catch (error) {
    return rejectWithValue(error.message || "something went woring");
}
})
export const getTodoAction = createAsyncThunk("todo/get", async (todoData, {rejectWithValue}) => {
try {
    const data = await api.get("/todo")
   return data.data
} catch (error) {
    return rejectWithValue(error.message || "something went woring");
}
})
export const updateTodoAction = createAsyncThunk("todo/update", async (update, {rejectWithValue}) => {
try {
    const {data} = await api.put(`/todo/${update.id}`, update)
    return true
} catch (error) {
    return rejectWithValue(error.message || "something went woring");
}
})
export const deleteTodoAction = createAsyncThunk("todo/delete", async (id, {rejectWithValue}) => {
try {
    const {data} = await api.delete(`/todo/${id}`)
    return true
} catch (error) {
    return rejectWithValue(error.message || "something went woring");
}
})