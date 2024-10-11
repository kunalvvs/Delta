import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  let arr = ["if" , "ternary", "switch","logical && operator"];
  let a =arr.map((ele)=><li>{ele}</li>);
  let st ={marginLeft: "50px", position:"fixed", top: "140px", fontSize: "20px", textAlign: "left", padding: "5px" ,backgroundColor: "rgb(245, 203, 163)" , border: "2px solid green" , color: "red" , borderRadius: "10px" };
  let h1 = {color:"rgb(255, 195, 25)", position: "fixed", top: "0%" ,marginLeft: "50px"};
  let d1 = { width: "400px" , height: "50px", backgroundColor: "grey" ,position:"fixed", top: "45px",};
  return (
    <>
      <div style={d1 }><h1 style={h1}>Condition </h1></div> 
     
    <div id='style' style={st}>{a} </div>
     </>
  )
}

export default App
