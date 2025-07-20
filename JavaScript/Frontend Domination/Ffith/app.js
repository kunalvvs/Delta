
let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let h3 = document.querySelector("h3");

let count = 0;
let timer;


start.addEventListener("click",function()
{
   timer =   setInterval(()=>{
          count++;
        h3.textContent = count;

    },200)
});

stop.addEventListener("click",function()
{
    clearInterval(timer);
})