import React, { useState } from 'react'
import Pro from './Pro';
import Extra from './extra.jsx'

function App() {
var [a,b]=useState(0);  //for data changing and sending and receiving
  return (
    <div> <div className=" p-10 text-xl font-bold underline text-red-500" > 
    Hello world!</div>
    
    
    <div className='p-10'>
    <h1 className='p-4'>{a}</h1>

      <button onClick={()=>b(a+1)} 
      className='px-3 py-1 bg-red-500 rounded-md ' >Click (for data changing)</button></div>
  <Pro naam='value' />
   <Extra/>
   
  </div>
    
  )
}

export default App


