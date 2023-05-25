import { createSlice } from "@reduxjs/toolkit";
import { addTodoAction, deleteTodoAction, getTodoAction, updateTodoAction } from "../actions/todoAction";

const todoSlice = createSlice({
    name : "todo",
    reducers : {
        invalidate: (state, {payload}) => {
            state.todoAdded = payload
            state.deletetodo = payload
            state.updateTodo = payload
            // state.error = payload
        }
    },
    initialState : {},
    extraReducers(builder){
        builder 
            .addCase(addTodoAction.pending, (state) => {
                state.loading = true
            })
            .addCase(addTodoAction.fulfilled, (state, {payload}) => {
                state.loading = false
                state.todoAdded = true
            })
            .addCase(addTodoAction.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })
                //getTodoAction
            .addCase(getTodoAction.pending, (state) => {
                state.loading = true
            })
            .addCase(getTodoAction.fulfilled, (state, {payload}) => {
                state.loading = false
                state.todos = payload
            })
            .addCase(getTodoAction.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })

            //updateTodoAction
            .addCase(updateTodoAction.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTodoAction.fulfilled, (state, {payload}) => {
                state.loading = false
                state.updateTodo = true
            })
            .addCase(updateTodoAction.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })

            //delete todo action
            .addCase(deleteTodoAction.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTodoAction.fulfilled, (state, {payload}) => {
                state.loading = true
                state.deletetodo = true
            })
            .addCase(deleteTodoAction.rejected, (state, {payload}) => {
                state.loading = true
                state.error = payload
            })
    }
})
export const {invalidate} = todoSlice.actions
export default todoSlice.reducer