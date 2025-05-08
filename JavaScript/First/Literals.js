let student = {
    name : "Kunal",
    age : 22,
    marks: 45,
    color: ["red","yelllow"]
};

console.log("Objects Literals ",student);

//it is better than array because in the array not 
// exist key value pair that is more understanding terms

const post = {
    username: "@kunal",
    content: "Mission of success",
    likes: 234,
    reposts: 5,
    tags: ["@another","@dinu"]
}

console.log("My Post ",post);
console.log("Username",post["username"]);  //get values seperately 
console.log("likes : ",post.likes);


//we can create nested objects like object of objects
const students = {
    aman: {
        name: "Aman",
        age: 20,

    },
    raman:{
        name: "Raman",
        age: 25
    }
}

//we can create Array of objects

const ClassInfo = [
     {
        name: "Aman",
        age: 20,

    },
    {
        name: "Raman",
        age: 25
    }
];

//random integer 1 to 10'
let n = Math.floor( Math.random()*10 ) +1;
console.log("Random Number ",n);
//random num from 1 to 5
let n1 = Math.floor( Math.random()*5 ) +1;
console.log("Random Number 1 to 5",n1);