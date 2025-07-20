
let home  = document.querySelector("#home");
let about = document.querySelector("#about");
let contact = document.querySelector("#contact");


 let ht = document.querySelector(".hometext");
  let at = document.querySelector(".abouttext");
   let ct = document.querySelector(".contacttext");



home.addEventListener("click",function()
{
    handlehead();
    ht.style.display = "inline-block";
}
)

about.addEventListener("click",function()
{
    handlehead();
    at.style.display = "inline-block";
}
)

contact.addEventListener("click",function()
{
    handlehead();
    ct.style.display = "inline-block";
}
)

function handlehead(){
  document.querySelectorAll("h3").forEach(function(h3){
    h3.style.display="none";
   })
}