import { useState } from "react"

export default function Form()
{
    let [fullName,setFullName] = useState("");

    function handleSubmit(event)
    {
        setFullName(event.target.value);
    }


    return (
        <form>
            <input placeholder="Enter anything" value={fullName} onChange={handleSubmit}></input>
            <button>Submit</button>
        </form>
    )
}