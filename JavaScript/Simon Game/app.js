
let gameSeq =[];
let userSeq =[];

let started = false;
let level =0;

let btns = ["one","two","three","four"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {

    if(started==false){
        console.log("game started ");
        started=true;

        levelUp();
    }
});

function btnFlash(btn)
{
    btn.classlist.add("flash");
   setTimeout(function(){
    btn.classlist.remove("flash");
   },300);
}

function levelUp()
{
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randIdx);
    console.log(randColor);
    console.log(randBtn);
    btnFlash(randBtn);
}

function btnPress(){
    let btn = this;
    btnFlash(btn);
    console.log("button pressed");
}

let allBtn = document.querySelector(".btn");
for(btn of allBtn)
{
    btn.addEventListener("click",btnPress);
}