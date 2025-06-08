import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    const [task, setTask] = useState([{task:"sample-task",id:uuidv4()}]);
    const [newTodo, setNewTodo] = useState("");

    let addtask = () => {
        if (newTodo.trim() !== "") {
            setTask([...task, {task: newTodo,id:uuidv4()}]);
            setNewTodo(""); // Clear the input after adding the task
        }
    };

    let updateList = (event) => {
        setNewTodo(event.target.value);
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
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </div>
    );
}