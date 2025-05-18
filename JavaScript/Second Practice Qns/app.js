
let p1 = document.createElement("p");
p1.innerText = "I am red";
document.querySelector("body").prepend(p1);
p1.classList.add("red");

let h3 = document.createElement("h3");
h3.innerText = "I am blue";
document.querySelector("body").prepend(h3);
h3.classList.add("blue");

let div = document.createElement("div");
let h1 = document.createElement("h1");
let p2 = document.createElement("p");

h1.innerText = "I am in div";
p2.innerText = "i am too";

div.append(h1);
div.append(p2);

document.querySelector("body").prepend(div);
div.classList.add("div");
