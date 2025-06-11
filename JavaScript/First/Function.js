

console.log("Function Started ................");

function entry()
{
    console.log("Function started");
}

entry();

//function with arguments parameters
function Info(name, age)
{
    console.log("Name: " + name);
    console.log("Age: " + age);
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
}

Info("John", 25);


//return keyword
function add(a, b)
{
    return a + b;
}

console.log("Addtion value return :",add(5, 10));

function getAdd(n) //sum of natural num
{
    let s=0;    //function scope

    for(let i=0;i<=n;i++)
    {
        s=s+i;
    }
    return s;
}

//higher order function
//lexical scope

let globalVar = "I am everywhere";

function outerFunction()
{
    let outerVar = " I am in outer";

    function innerFunc()
    {
        let innerVar = "i am in inner";

        console.log("Inner Var : ",innerVar);
        console.log("Outer Var inside inner func : ",outerVar);
        console.log("Global Var inside inner func : ",globalVar);
    }

    innerFunc();
    // console.log("Inner Var in outer ",innerVar);// it will give error , outer can not see the inner 
}

outerFunction();
//methods


//for button 
let btn = document.querySelector("button");
btn.addEventListener("click",()=>{
    let h1 = document.querySelector("h1");
    h1.innerText = Info;
})