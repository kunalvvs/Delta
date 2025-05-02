
let arr = [23,42,32,"Hello"];
console.log("OG array",arr);

console.log("Array Started : \n",arr[3]);


arr[4] = ["322"];

arr[0]=45;

console.log("-----------------------------------");
arr.push("Last");
console.log("After push ",arr); //push,pop,shift,unshift
arr.pop();
console.log("After Pop",arr);
arr.unshift("First");
console.log("After unShift",arr);


//indexOf and includes
console.log("-----------------------------------");
console.log("Index is ",arr.indexOf(42));

//concat and reverse 

let ar1 = ["audi","bmw"];
let ar2 = ["ferrari","nano"];
console.log("-----------------------------------");
console.log("Concatenation: ",ar1.concat(ar2));
console.log("Reverse array 1",ar1.reverse());