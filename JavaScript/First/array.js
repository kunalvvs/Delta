
let arr = [23,42,32,"Hello"];
console.log("Array Started : \n",arr[3]);


arr[4] = ["322"];

arr[0]=45;


arr.push("Last");
console.log("After push ",arr); //push,pop,shift,unshift
arr.pop();
console.log("After Pop",arr);
arr.unshift("First");
console.log("After unShift",arr);