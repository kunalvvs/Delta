import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Second from './Second.jsx'


function App(p) {
  return <>
  
    <h1 className='h1 p-10 '>First React App </h1>
    <h3>It is description.
      Again it is beginning of react 25th May 25 {p.name} </h3>
   <Second />
  
  </>
  };

export default App