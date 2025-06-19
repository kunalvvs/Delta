//using useEffect

import { useEffect, useState } from "react";

export default function Counter(){

    const [countx, setCountx] = useState(0);
    const [county, setCounty] = useState(0);


    let Incx = () =>{
        setCountx(countx + 1);
    }

     let Incy = () =>{
        setCounty(county + 1);
    }
    
    useEffect(function set(){
        console.log("useEffect is called");
    },[countx])

    return (
        <div>
          <p>Count {countx}</p>
          <button onClick={Incx}>Add</button>
            <p>Count {county}</p>
          <button onClick={Incy}>Add</button>
        </div>
    )
}