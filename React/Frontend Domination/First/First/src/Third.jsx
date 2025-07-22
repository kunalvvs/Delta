import { useState } from "react";

export default function Third()
{
    const [inp, setInp] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setInp(inp.trim() ? "Valid!" : "Error: Invalid input");
    }

    return (
        <div>
            <h4>3. Create a form with input fields and a submit button. Use JavaScript to validate
            the form and display an error message if the input is invalid.</h4>
            <p>{inp}</p>
            <form onSubmit={handleInput}>
                <input 
                    type="text" 
                    placeholder="write something" 
                    value={inp} 
                    onChange={(e) => setInp(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}