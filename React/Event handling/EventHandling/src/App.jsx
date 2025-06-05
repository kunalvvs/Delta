
import './App.css'
import Buttons from './Buttons'
import Events from './Buttons'
import Form from './Form'

import React, { useState } from "react";
// function App() {
  

//   return (
//     <>
//       <div>
//         {/* <Buttons/> */}
//         <Form/>
//       </div>
     
//     </>
//   )
// }

// export default App


function App() {
	const [value, setValue] = useState("");
	function handleChange(e) {
		setValue(e.target.value);
	}
	return (
		<div
			style={{ textAlign: "center", margin: "auto" }}
		>
			<h1 style={{ color: "Green" }}>
				Hi All Code is Green
			</h1>
			<h3>
				Exemple for React onChange Event Handler
			</h3>
			<input value={value} onChange={handleChange} />
			<br />
			<div>User Input:- {value}</div>
			<Buttons/>
			<Form/>
		</div>
	);
}

export default App;
