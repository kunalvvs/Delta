import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTodo } from "../features/Todo/todoSlice";


export default function AddForm(){

    let [task,setTask] = useState();
    const dispatch = useDispatch();

    const handler=(evt)=>{
          evt.preventDefault();
          setTask("");
          console.log(task);
          dispatch(addTodo(task));
    }
    return <>
    <form onSubmit={handler}>
        <input type="text" onChange={e => setTask(e.target.value)}></input>
        <button>Add</button>
    </form>
    </>
}