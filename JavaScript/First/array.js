
let arr = [23,42,32,"Hello"];
console.log("OG array",arr);

console.log("index 3  : ",arr[3]);


arr[4] = ["322"];

arr[0]=45;

console.log("-----------------------------------");
arr.push("Last");
console.log("After push ",arr); //push,pop,shift,unshift
arr.pop();
console.log("After Pop",arr);
arr.unshift("First");
console.log("After unShift",arr);


//indexOf and includes:- true/false
console.log("-----------------------------------");
console.log("Index is ",arr.indexOf(42));

//concat and reverse 

let ar1 = ["audi","bmw"];
let ar2 = ["ferrari","nano"];
console.log("-----------------------------------");
console.log("Concatenation: ",ar1.concat(ar2));
console.log("Reverse array 1",ar1.reverse());

//slice method
console.log("-----------------------------------");
console.log("Slice method : ", ar1.slice(1));

//Splice method

console.log("-----------------------------------");
console.log("Splice method: ",ar2.splice(0,1,"Supra","Lambo"));

//sort method - it convert number into string for sorting
console.log("-----------------------------------");
console.log("Sorting: ",ar1.sort());

//nested array
console.log("-----------------------------------");
let arr4 = [[3,5],[5,6],[7,2]];
console.log("Nested Array: ",arr4);