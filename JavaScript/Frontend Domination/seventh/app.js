
let prog = document.querySelector(".progress");
let p = document.querySelector("p");
let count = 0;

let c = setInterval(function(){
      count++;
      if(count===100)
      {
        clearInterval(c);
        p.innerText = "Download Completed";
      }
      prog.style.width = count + "%";
},100)