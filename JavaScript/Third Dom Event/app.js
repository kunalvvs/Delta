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

//this keyword handle events

let tbtn = document.querySelector("#this");
let t = document.querySelector("#t");
function change()
{
    console.log(`change color for ${this.innerText}`);
   this.style.backgroundColor = "blue";
}

tbtn.addEventListener("click",change);
t.addEventListener("click",change);


//keyboard events

let inp = document.querySelector("input");

inp.addEventListener("keydown",function(event)
{
console.log(event);
console.log("Key = ",event.key);
console.log("COde = ",event.code);

    if(event.code=="KeyW")
    {
        console.log("Key up");
    }
    else if(event.code=="KeyA"){
        console.log("move left");
    }
    else if(event.code=="KeyD"){
        console.log("move right");
    }
    else if(event.code=="KeyS"){
        console.log("move down");
    }
})
