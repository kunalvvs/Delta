
let gameSeq =[];
let userSeq =[];


let started = false;
let level =0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {

    if(started==false){
        console.log("game started ");
        started=true;

        levelUp();
    }
})

function btnFlash(btn)
{
    btn.classlist.add("flash");

   setTimeout(function(){
    btn.classlist.remove("flash");
   },1000);
}

function levelUp()
{
    level++;
    h2.innerText = `Level ${level}`;

    btnFlash();
}