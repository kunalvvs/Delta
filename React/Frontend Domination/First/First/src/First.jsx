import { useState } from "react"

export default function First()
{
    let [text,setText] = useState("It will change");

    let handleChange = ()=>{
        setText("Now It has Changed");
    }
    return (
        <div>
            <h3>1. Create an HTML page with a button. When the button is clicked, change the text of
a paragraph element.</h3>   
        <h4 style={{color:"red"}}>{text}</h4>
        <button onClick={handleChange}>Change Text</button>

        </div>
    )
}