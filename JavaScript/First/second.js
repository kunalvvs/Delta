

//trim method in string

let str = " Ram Ram  ";
console.log("Trim Met : "+str.trim());
console.log("LowerCase : "+str.toLowerCase());  //here we can use method chaining to perform trim and lowercase method
console.log("Indexoof : "+str.indexOf("m")); 

let str2 =" It willl be perform method chaining";
console.log("Method chaining: "+str2.trim().toUpperCase());


console.log("Slice Method: ",str2.slice(3,9));

console.log("Replace l to space : ",str2.replace("l",""));

console.log("Repeat method : ",str.repeat(4));
