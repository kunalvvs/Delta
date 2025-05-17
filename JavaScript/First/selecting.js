document.getElementById("id");

document.getElementsByClassName("");

document.getElementsByTagName("h1");


document.querySelector("p");   //it is same from above selectors 
document.querySelectorAll("p");

//these are properties met 
let para = document.querySelector("p");

para.innerHTML;   
para.innerText;
para.textContent; 

//we can manipulate attributes
let para1 = document.querySelector("p");
para.getAttribute("id");
para.setAttribute("id", "myId");
para.removeAttribute("id");


// we can use style property

let links = document.querySelector("h1");
links.style.color = "red";
links.style.fontSize = "30px";
links.style.fontFamily = "Arial";
