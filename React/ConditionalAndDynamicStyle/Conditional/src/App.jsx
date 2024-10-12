import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignUp from './Extra'
import Goal from './Ternary'
import MissedGoal from './Ternary'
import NotificationMsg from './NotificationMsg'
// import './App.css'

function Example()   
{   
    return(<div>   
            {   
            
                (10 > 5) && alert('This alert will be shown!')  
            }   
           </div>   
        );   
}   //This is exmaple of Logical Operator



function App() {
  let arr = ["if" , "ternary", "switch","logical && operator"];
  let a =arr.map((ele)=><li>{ele}</li>);
  let st ={ marginLeft: "50px",  fontSize: "20px", textAlign: "left", padding: "5px" ,backgroundColor: "rgb(245, 203, 163)" , border: "2px solid green" , color: "red" , borderRadius: "10px" };
  let h1 = {color:"rgb(255, 195, 25)", position: "fixed", top: "0%" ,marginLeft: "50px"};
  let d1 = { width: "400px" , height: "50px", backgroundColor: "grey" ,position:"fixed", top: "45px",};
  let h2 = {marginLeft: "10px" ,
    border: "3px solid blue" , 
    padding:"3px" , 
    borderRadius: "10px"};
  return (
    <  >
      <div style={d1 }><h1 style={h1}>Condition </h1></div> 
     
    <div id='style' style={st}>{a} </div>
    <h3 style={h2}>If Statement 👇🏻</h3>
    <SignUp/>
    <h2 style={h2}>Logical Operator</h2>
     {/* <Example /> */}  
     

     {/* <Goal/> */}
     <h2 style={h2}>Ternary Operator</h2>
   <MissedGoal/>
   <h2 style={h2}>Switch Case</h2>
   <NotificationMsg text="Hi All"/>
     </>
  )
}

export default App




