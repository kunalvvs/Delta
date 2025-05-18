let btns = document.querySelectorAll("button");

for( btn of btns){
    btn.onclick = sayHello;  //here you should not use () because it execute auto
}

function sayHello()
{
    alert("Hello");
}