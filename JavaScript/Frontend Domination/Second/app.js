

let f = document.querySelector(".f");
let s = document.querySelector(".s");

let btn = document.querySelector("button");

btn.addEventListener("click",function()
{

    let img1 = f.src;
    let img2 = s.src;

    // f.src = img2;
    // s.src = img1;

    s.setAttribute("src",img1);
    f.setAttribute("src",img2);
});