import { useState } from "react"
import './App.css'

export default function Div()
{
    
    const [isOneVisible, setIsOneVisible] = useState(true);

    const handleToggle = () => {  
        setIsOneVisible(!isOneVisible);
    };
    return ( 
        <div>
            <div>
            {isOneVisible ? <div className="one">First</div> : <div className="two">Second</div>}
            <button onClick={handleToggle}>Toggle</button> 
        </div>
        </div>
    )
}