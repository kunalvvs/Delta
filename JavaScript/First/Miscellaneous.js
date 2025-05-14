
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

//array methods 
let arr = [23,43,22];
arr.forEach((h)=>{    //for each loop
  console.log("For each loop",h);
})


let intoo = arr.map((el)=>{
    return el*2;  //map
})
console.log("Using Map",intoo);

let newArr = arr.filter((ed)=>{   //filter 
    return ed%2==0;
})

console.log("Using filter : ",newArr);

let ev = arr.every((el)=>{  //every method
    console.log("Every answer is ",el%2==0);
})