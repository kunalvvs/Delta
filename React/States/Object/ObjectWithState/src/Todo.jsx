import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    const [task, setTask] = useState([{task:"sample-task",id:uuidv4()}]);  
    //Array of object
    const [newTodo, setNewTodo] = useState("");

    let addtask = () => {
        if (newTodo.trim() !== "") {
            setTask((prevTask)=>{
                return [...prevTask, {task: newTodo,id:uuidv4()}]
        });
            setNewTodo(""); // Clear the input after adding the task
        }
    };

    let updateList = (event) => {
        setNewTodo(event.target.value);
    };


    let deleteTask =(id)=>{
        setTask(task.filter((todo) => todo.id != id  
        //for removing in the array
        ))
    }

       // Convert all tasks to uppercase
    let UpperCaseAll = () => {
        setTask((prevTasks) =>
            prevTasks.map((todo) => {
                return {
                    ...todo,
                    task: todo.task.toUpperCase(),
                };
            })
        );
    };


    // Convert a single task to uppercase
    let upperCaseOne = (id) => {
        setTask((prevTasks) =>
            prevTasks.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        task: todo.task.toUpperCase(),
                    };
                } else {
                    return todo;
                }
            })
        );
    };
    return (
        <div>
            <input
                placeholder="Type task"
                value={newTodo}
                onChange={updateList}
            ></input>
            <button onClick={addtask}>Add task</button>
            <h2>Task Todo</h2>
            <ul>
                {task.map((todo) => (    
        //map is recomended to used the show list in the arrya in react 
                   <span> <li key={todo.id}>{todo.task}
                    <button onClick={()=>deleteTask(todo.id)}>Delete</button> 
                    <button onClick={()=>upperCaseOne(todo.id)}>UpperCase</button>
                    </li></span>
                    
                ))}
            </ul>
            <button onClick={UpperCaseAll}>UpperCase All</button>
        </div>
    );
}