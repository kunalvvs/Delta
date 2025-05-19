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


//form events

let form =  document.querySelector("form");

form.addEventListener("submit",function(event){
    event.preventDefault();

    console.log("form submitted");
})

//data extraction from form

let form2  = document.querySelector("#form2");

form2.addEventListener("submit",function(event)
{
    event.preventDefault();
    let user = document.querySelector("#user");
    let pass = document.querySelector("#pass");

    alert(`Hi ${user.value} and your pass is ${pass.value}`);

})


//change and input events

let input2 = document.querySelector("#input2");

input2.addEventListener("change",function()
{
    console.log("final changes : ",input2.value);
});

input2.addEventListener("input",function()
{
    let p = document.querySelector("#inputpara");

    p.innerText = input2.value;
})

//practice qns -: green button 
let btngreen = document.querySelector("#btngreen");

btngreen.addEventListener("click",function()
{
    btngreen.style.backgroundColor = "green";
})

