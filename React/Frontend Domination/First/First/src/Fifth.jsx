import { useState } from "react"

export default function Fifth()
{
    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    
    const handleTimer = () => {
        if (intervalId) return; // Prevent multiple timers
        
        const id = setInterval(() => {
            setCount(prev => prev + 1);
        }, 200);
        
        setIntervalId(id);
    }

    const handleStop = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    
    return (
        <div>
            <h1>Timer</h1>
            <h1>{count}</h1>
            <button onClick={handleTimer}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}