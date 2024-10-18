import { useState } from "react"


export default function Counter()
{
    let [count,setCount] = useState(0);
  
    let Inc =() => {setCount(count+1)};
    return <>
    
    <h3 style={{border:"2px solid grey",borderRadius:"8px"}}> Counter value is {count}</h3>

    <button onClick={() => setCount(count + 1)}>
                Click me (Second method to define onClick)
            </button> 

    <button style={{border:"2px solid yellow" }} onClick={Inc}>Add this</button>
    </>
}







// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0); // Initial state is 0

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// }

// export default Counter;
