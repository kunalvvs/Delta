import { useState } from "react";

export default function Fourth() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");

    return (
        <div>
            <h3>Create an unordered list. Allow users to add and remove list items dynamically using buttons</h3>
            <input 
                type="text" 
                placeholder="add task" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
            />
            <button onClick={() => {
                if(input.trim()) {
                    setItems([...items, input]);
                    setInput("");
                }
            }}>add</button>
            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        {item} <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}>remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}