import { useState } from "react";
import './App.css'

export default function Other()
{
    
    let [text,setText] = useState();
    let [add,setAdd] = useState();


    let handleText=(evt)=>{
        setText(evt.target.value);

    }

    let handleBut = ()=>{
        setAdd(text);
    }


    return <>
    
    <input type="text" value={text}  placeholder="write something" onChange={handleText}></input>
    <p > Live Texting :-  {text} </p>

    <button onClick={handleBut}>Add</button>
    <p>  👉 {add}</p>

    </>
}