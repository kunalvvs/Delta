import { useState } from "react";
import './App.css'

export default function Other()
{
    
    let [text,setText] = useState("Write something here");
    let [show,setShow] = useState();

    let handleText = (evt) =>{
        setText(evt.target.value);
    }

    let handleEvent = ()=>{
        setShow(text);
    }

    return <>
    
    <input type="text" placeholder="write something" value={text} onChange={handleText}/>
    <p>Live Show: {text}</p>
    <p>{show}</p>
    <button onClick={handleEvent}>Show Text</button>
   

    </>
}