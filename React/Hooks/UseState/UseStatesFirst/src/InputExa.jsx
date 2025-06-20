import { useState } from "react"

export default function InputExa()
{
    let [text,setText] = useState("");
    let [submit,setSubmit] = useState();

    let handleInput=(event)=>{
        setText(event.target.value);
    }

    let handleSubmit = ()=>{  //for print by the button
        setSubmit(text);
    }

  

    return (
        <div>
            <input type="text" value={text} name="one" placeholder="write something" onChange={handleInput}/>
            <p>{text}</p>


             <input type="text" value={text} name="two" placeholder="write something" onChange={handleInput}/>
            <button onClick={handleSubmit}>Add </button>
            <p >{submit}</p>
        </div>
    )
}