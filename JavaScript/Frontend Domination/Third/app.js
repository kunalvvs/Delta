

let btn  = document.querySelector("button");
let form = document.querySelector("form");
let input = document.querySelectorAll('input[type="text"]');
let h2 = document.querySelector("h2");

form.addEventListener("submit",function(event)
{
    event.preventDefault();
   for(let i=0;i<input.length;i++){
        if(input[i].value.trim()===''){
            h2.textContent="Error fill field";
            h2.style.color="red";
            console.log("Error")
        }
        console.log(input[i].value)
   }

})

