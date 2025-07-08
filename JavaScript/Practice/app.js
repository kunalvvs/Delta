
let one = document.querySelector(".one");
let two = document.querySelector(".two");

let btn = document.querySelector("button");

btn.addEventListener("click", function () {
    if (one.classList.contains("hidden")) {
        one.classList.remove("hidden");
        two.classList.add("hidden");
    } else {
        one.classList.add("hidden");
        two.classList.remove("hidden");
    }
});

//for practice of looping concept 
let str = ["kfsd","vdsv","dsd"];

for(let i=0;i<str.length;i++)
{
    console.log(str[i]);
}

for( obj of str)
{
    console.log(obj)
}

for( obj1 in str)
{
    console.log(` on positon ${obj1} is ${str[obj1]}`);
}