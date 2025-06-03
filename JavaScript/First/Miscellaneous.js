

// Arrow function
// set timeout
// set setInterval
// array method: for each,reduce,some,every,map,filter.Arrow
// Default parameter
// Spreading
//Rest concept
//Destructuring :array,objects


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
const add1 = (a,b) => (a+b);
console.log("Add using implicit : ",add1(4,5));


//set timeout function
console.log("Here is beginning ");
setTimeout(() => {    //contains callback func 
    console.log("set timeout"); //it will be print after 4 sec
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
arr.forEach((h,i)=>{    //for each loop
  console.log("For each loop",h," at index ",i);
})


let intoo = arr.map(el=>el*2)
       //map
console.log("Using Map",intoo);

let newArr = arr.filter(ed=> ed%2==0)  //filter 
    

console.log("Using filter : ",newArr);

let ev = arr.every((el)=>{  //every method used to AND oper unlike some met used to OR oper
    console.log("Every answer is ",el%2==0);
})



let red = arr.reduce((res,el)=>{  // it convert the output into single value 
return res+el;
})
console.log("Using Reduce fun:",red);


//default parameter

function sums(a,b=4){
    return a+b;
}
console.log("Default Para ",sums(3));

//Spreading

let arr3 = [23,4,3,7,3,5];
let maxValue = Math.max(...arr3);
console.log("Max value Using Spread ",maxValue);

//destructuring array

let des = ["tony","peter","xyz","pyq"];
let [win,sec,...others] = des;       //rest concept using ...others in destructuring
console.log("Winner: ",win,"\nothers: ",others);

//destructuring objects 

let stu = {
    name:"Kunal",
    age: 34,
    marks:67,
    city:"Agra"

}

let { name,age } = stu;     //object destructuring
console.log("Name : ",name);