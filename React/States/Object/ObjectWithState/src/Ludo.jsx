import { useState } from "react";

export default function Ludo( )
{
    const [moves, setMoves] = useState({     //object with states
    blue : 0,
    red:0,
    green:0,
    yellow:0
  });
  
  const [arr,setArr] = useState([]);        //Array with states


  let updateBlue = () =>{
    setMoves((previousMove) =>{
        return {...previousMove, blue: previousMove.blue+1}
      });


      setArr((prevArr)=>{
        return [...prevArr,"blue moves"]     //array state
      })
    }
  let updateRed = () =>{
    setMoves((previousMove) =>{
        return {...previousMove, red: previousMove.red+1}
      });
    }
  let updateGreen = () =>{
    setMoves((previousMove) =>{
        return {...previousMove, green: previousMove.green+1}
      });
    }
  let updateYellow = () =>{
    setMoves((previousMove) =>{
        return {...previousMove, yellow: previousMove.yellow+1}
      });
    }
  return (
    <>
      <div>
       <h3>Ludo </h3>
        <p>{arr}</p>
        <p >Blue moves : {moves.blue} </p>
        <button style={{backgroundColor: "blue"}} onClick={updateBlue}>+1</button>
        <p>Red moves : {moves.red} </p>
        <button  style={{backgroundColor: "red"}} onClick={updateRed}>+1</button>
         <p>Green moves : {moves.green} </p>
        <button  style={{backgroundColor: "green"}} onClick={updateGreen}>+1</button>
         <p>Yellow moves : {moves.yellow} </p>
        <button  style={{backgroundColor: "yellow", color:"black"}} onClick={updateYellow}>+1</button>
             </div>
     
    </>
  )
}
