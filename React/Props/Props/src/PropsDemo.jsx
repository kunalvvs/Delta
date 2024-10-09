


import React from 'react';
import ReactDOM from 'react-dom/client';
import Sum from './Sum';

function PropsDemo(p)
    
{
    return <>
    <div>
         This is {p.title}
    </div>
    
    
    </>
}

function Car(props) {
  return <h2>I am a { props.brand.model }!</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <>
	    <h1>Who lives in my garage?</h1>
	    <Car brand={ carInfo } />
    </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Garage />);
export default PropsDemo