//Reducers

import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState ={
    todos: [{ id:"abc" ,task:"First Task",isDone:false }]
}


export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
          const newTodo={
            id:nanoid(),
            task:action.payload,
            isDone:false
          }
          state.todos.push(newTodo); //direct mutation than Reactjs
        },
        deleteTodos: (state ,action)=>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload);
        },
        isMarkDone:(state,action)=>{
            state.todos = state.todos.map(todo=>{
                if(todo.id === action.payload){
                    return {...todo, isDone: !todo.isDone};
                }
                return todo;
            });
        }
    }
})

export const {addTodo,deleteTodos,isMarkDone}= todoSlice.actions;
export default todoSlice.reducer;