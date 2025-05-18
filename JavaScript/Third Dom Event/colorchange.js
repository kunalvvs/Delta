let btn = document.querySelector("button");

btn.addEventListener("click",()=>{

    let h1 = document.querySelector("h1");
    let rc = getrandom();
    h1.innerText = rc;

    let div = document.querySelector("div");

    div.style.backgroundColor = rc;

   
});

function getrandom()
{
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);

    let color = `rgb(${red},${green},${blue})`;
    return color;
}