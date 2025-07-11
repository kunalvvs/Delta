import {useDispatch, useSelector} from "react-redux";
import AddForm from "./AddForm";
import { deleteTodos, isMarkDone } from "../features/Todo/todoSlice";
// import "./App.css";

export default function Todo()
{
    const todos = useSelector((state) => state.todos);
    console.log(todos);
    const dispatch = useDispatch();

    const clickHandler=(id) =>{
        dispatch(deleteTodos(id));
    }

    const markHandler = (id) =>{
        dispatch(isMarkDone(id));
        console.log("Marked")
    }
    return <>
    <AddForm/>
    <h2>Todos</h2>
    <ul>
        {todos.map(todo =>
            <span style={ todo.isDone ? {textDecorationLine:"line-through"}:{}}> <li key={todo.id}>{todo.task} 
            <button onClick={()=>clickHandler(todo.id)}>Delete</button> 
            <button className="markDone" onClick={()=>markHandler(todo.id)}>Mark as Done</button>
             </li>
             </span>)}
    </ul>
    </>
}