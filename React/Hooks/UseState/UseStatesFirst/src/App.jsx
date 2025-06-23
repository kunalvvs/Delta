import { useState } from 'react'
import './styles.css'
import Counter from './Counter'
import LikeButton from './LikeButton'
import PasswordGenerator from './PasswordGenerator' //this is cpy pst cde
import InputExa from './InputExa'
import Div from './Div'
import Div1 from './Div1'


function App() {
  
  return (
    <>
     <h2 style={{color:"orange"}}>Lets Start The Hooks First Topic is UseState</h2>
     {/* <Counter/> */}
     {/* <InputExa/> */}
     <Div/>
     <p>-------------------------------------------------</p>
     <Div1/>
     <LikeButton/>
    {/* <PasswordGenerator/>   */}
    
    </>
  )
}

export default App
