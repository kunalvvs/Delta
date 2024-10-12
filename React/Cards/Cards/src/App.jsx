
// import './App.css'
import Description from './Description';

//in this project I used props and dynamic styles with multiple comp.

function App() {
  let childCard = {border: "3px solid rgb(235, 209, 121)",
    width: "150px", height: "200px",
   borderRadius:"10px",margin:"10px",
  backgroundColor:"rgb(78, 220, 255)"};
 
  return (
    <>
    <h2 style={{textAlign:'center'}}>BlockBuster Deals </h2>
     <div style={{display:"flex", flexWrap:"wrap" }}>
      <div style={childCard}> <Description title="Logitech Mouse" des="8000 DPI " des1="Wireless RGB "
      price={5000}/></div>
      <div style={childCard}><Description title="Keyboard" des="8000 DPI" des1="Feature" price={5000}/></div>
      <div style={childCard}><Description title="Apple Pen" des="Iski " des1="Gesture Support" price={1000}/></div>
      <div style={childCard}><Description title="Monitor" des="Jsdds" des1="High Graphics" price={4555}/></div>
     </div>
     
    </>
  )
}

export default App
