import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PropsDemo from './PropsDemo'
import Sum from './Sum'



function App() {
  

  return <>
      <div className=''> 
         <h1>Props Lab</h1>
        <PropsDemo title="first prop"/>
        <PropsDemo title="sec prop"/>
        <PropsDemo title="third prop"/>
        <Sum a={23} b={43}/>
      </div>
    </>

}

export default App
