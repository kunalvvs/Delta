import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
let arr = [<li>23</li>,<li>4</li>,<li>2</li>,<li>4</li>];
let brr = [23,4,2,4];
const fruits = new Map([
  [" apples: ", 500],
  [" bananas: ", 300],
  [" oranges: ", 200]
]);
let ProductList = [
  "iPhone 13",
  "Samsung Galaxy S22",
  "MacBook Pro",
  "Sony PlayStation 5",
  "Dell XPS 13",
  "Nike Air Max 270",
  "Canon EOS 5D Mark IV",
  "Bose QuietComfort 45",
  "Apple AirPods Pro",
  "LG OLED 4K TV"
];
  return (
     <>   
    <div className='setArr' id='setArr'><b>Here is the Array by List tags</b> {arr}</div>
      <p className='pset'>This is written by the Map</p>
     {fruits}
    <div> This is second arr {brr}</div>
    <h2>------------Normal List without using Map---------------</h2>
    <div>{ProductList}</div>
    <h1>------------------------With Map--------------------------</h1>
    <div>{ProductList.map((ele)=>{
      return  <ul>{ele}</ul>
    })} </div>
    </>
  )
}

export default App
