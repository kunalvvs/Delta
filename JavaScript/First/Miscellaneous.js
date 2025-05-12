
console.log("Miscellaneous Started ................");

//Arrow function
const sum = (a,b) => {
    console.log("Addition : ",a+b);
}
sum(2,3);

const pow = (a,b) =>{
    return a**b;
}
console.log("Power : ",pow(4,2));

//Arrow function using implicit 
const add = (a,b) => (a+b);
console.log("Add using implicit : ",add(4,5));


//set timeout function
console.log("Here is beginning ");
setTimeout(() => {    //contains callback func 
    console.log("set timeout");
}, 4000);
console.log("Ending");


//set interval
let id = setInterval(() => {
    console.log("Interval");
}, 500); //it can be stop by calling clearinterval(id)

setTimeout(()=>{
    clearInterval(id)
    console.log("clear interval");
},10000);