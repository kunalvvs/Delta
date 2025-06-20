import { useState } from 'react'
import './styles.css'
import Counter from './Counter'
import LikeButton from './LikeButton'
import PasswordGenerator from './PasswordGenerator' //this is cpy pst cde
import InputExa from './InputExa'


function App() {
  
  return (
    <>
     <h2 style={{color:"orange"}}>Lets Start The Hooks First Topic is UseState</h2>
     {/* <Counter/> */}
     <InputExa/>
     <LikeButton/>
    {/* <PasswordGenerator/>   */}
    
    </>
  )
}

export default App
