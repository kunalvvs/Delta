
let btn = document.querySelector(".add");
let inp = document.querySelector("input");
let add = document.querySelector(".add");

let ul = document.querySelector("ul");
let delbtn  = document.createElement("button");

btn.addEventListener("click" ,function()
{
    let li = document.createElement("li");
    li.textContent = inp.value;
  ul.appendChild(li);
    
    
    let delbtn  = document.createElement("button");
    delbtn.textContent = "delete it";
    li.appendChild(delbtn);
    inp.value=" ";


})

