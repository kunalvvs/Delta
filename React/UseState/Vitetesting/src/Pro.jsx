import React, { useCallback, useState } from 'react'


function Pro({naam}) {
  const [a,b] = useState(true);
  return (
    <div className='w-30 text-2xl p-10 ' >Second Component started from here 
     <p>{naam} <b>(this is data sending and receiving concept)</b></p>
    
         
         <h4 className={`${a===true ? "text-red-600" : "text-blue-600"}`}>{a===true ? "Red" : "Blue"}</h4>
       <button onClick={()=>b(!a)} className='px-6 bg-green-600 rounded-md' >Change color</button>
    </div>
  )
}

export default Pro