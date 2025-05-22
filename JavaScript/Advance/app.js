

//call stack concept
function one()
{
    return 1;
}

function two()
{
    return one() + one();
}

function three(){
    let ans = two() +one();
    console.log(ans);
}

three();

//callback hell or nesting

let h1 = document.querySelector("h1");

function changeColor(color,delay,nextColor)
{
    setTimeout(()=>{
        h1.style.color=color;
        if (nextColor()) nextColor();
    },delay);
    
}

changeColor("red",1000,()=>{
    changeColor("blue",1000,()=> {
        changeColor("green",1000 );
     });
});