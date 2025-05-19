
let btn = document.querySelector("#add");
let inp = document.querySelector("input");
let ol = document.querySelector("ol");

btn.addEventListener("click",function(event)
{
    let li  = document.createElement("li");
    li.innerText = inp.value;

    let delbtn = document.createElement("button");
    delbtn.innerText = "Delete it";
    delbtn.classList.add("delete");

    li.appendChild(delbtn);
    ol.appendChild(li);
    inp.value =" ";
})


ol.addEventListener("click",function(){
    let delbtn = event.target.classList.contains("delete");
    if(delbtn){
        event.target.parentNode.remove();
        }
        

})
