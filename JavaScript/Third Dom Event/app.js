let btn = document.querySelector("button");

// for( btn of btns){           //use loop when multiple buttons
    btn.onclick = sayHello;  //here you should not use () because it execute auto
    btn.onmouseenter = function ()
    {
        console.log("you enter this button");
    }
// }




//addeventlistener
let btn1 = document.querySelector("#ael");

// for(btn1 of btn2){    
    btn1.addEventListener("click",sayHello);   //it can handle multiple events
    btn1.addEventListener("click",()=>{
      alert("this is second");
    });
    btn1.addEventListener("dblclick",()=>{
        alert("Double click");
    });
// }

function sayHello()
{
    alert("Hello");
}