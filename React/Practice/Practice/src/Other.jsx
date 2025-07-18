import { useState } from "react";
import './App.css'

export default function Other()
{
    
    let [text,setText] = useState();
    let [add,setAdd] = useState();
    let [div,setDiv] = useState(true);
    let [div1,setDiv1] = useState(false);

    let handleText=(evt)=>{
        setText(evt.target.value);

    }

    let handleBut = ()=>{
        setAdd(text);
    }

    let handleBox = () =>{
        if(div){
            setDiv1(true);
            setDiv(false);
        }
    }

    return <>
    
    <input type="text" value={text}  placeholder="write something" onChange={handleText}></input>
    <p > {text} </p>

    <button onClick={handleBut}>Add</button>
    <p>{add}</p>

    <div> {div ? <div className="one">First</div> : <div className="two">Second</div>} </div>
    <button onClick={handleBox}>Toggle</button>
    </>
}