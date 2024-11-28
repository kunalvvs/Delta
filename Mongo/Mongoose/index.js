const mongoose = require('mongoose');

main().then( ()=>{
    console.log('connected to db');  //promise resolve
}).catch(err => console.log(err));  //if error occured 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}


const userSchema = new mongoose.Schema({  //Schema 
    name: String,   //short form 
    email: String,
    age: Number,
});

const User = mongoose.model("User",userSchema);  //collection created

// const user1 = new User({
//     name: "Kunal",
//     email: "kunal@gmail.com",
//     age: 25,
// });   //document created in the users collections

// const user2 = new User({
//     name: "Rohan",
//     email:"Rohan@gmail.com",
//     age: 30,
// });

// user2.save().then((res) =>{   //save in the DB
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });


// User.insertMany([       //for many inserting the data
//     { name:"Tony", email:"tony@gmail.com",age:23},
//     { name:"Rohan", email:"rohan@gmail.com",age:30},
//     { name:"Rahul", email:"rahul@gmail.com",age:40},
// ]).then( res => { console.log(res)});

console.log("-------------------------");

User.find({age: {$gt: 20}}).then(res=> {
    console.log(res);       //console.log(res[0].name) for particular info in document
}).catch(err=>{
    console.log(err);
});

// console.log("---------------FindOne--------------");

// User.findOne({age: {$gt: 20}}).then(res=> {
//     console.log(res);       //console.log(res[0].name) for particular info in document
// }).catch(err=>{
//     console.log(err);
// });

// User.updateOne({name:"Rahul"},{age:41}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });

// User.findOneAndUpdate({name:"Rahul"},{age:12},{new: true}).then(res=>{
//     console.log(res);
// }).catch(err=>{ console.log(err)});   


// User.findByIdAndUpdate("6746b5fbd60d38edeff98dad",{age:42},{new: true}).then(res=>{
//     console.log(res);
// }).catch(err=>{ console.log(err)});   


// User.findByIdAndDelete("6746b5fbd60d38edeff98dad",{age:42},{new: true}).then(res=>{
//     console.log(res);
// }).catch(err=>{ console.log(err)});   
