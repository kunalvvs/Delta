import { useState } from "react"
import './App.css'

export default function Div()
{

    let [one,setOne] = useState(true);
    let [two,setTwo] = useState(false);
    
    const [isOneVisible, setIsOneVisible] = useState(true);

    let handleState=()=>{
        setOne(false);
        setTwo(true);
    }  

    const handleToggle = () => {  
        setIsOneVisible(!isOneVisible);
    };
    return ( 
        <div>

          { one &&  <div className="one"  >First</div>}  
           { two && <div className="two">Second</div>}
            <button onClick={handleState}>Toggle</button>


            <div>
            {isOneVisible ? <div className="one">First</div> : <div className="two">Second</div>}
            <button onClick={handleToggle}>Toggle</button> 
        </div>
        </div>
    )
}