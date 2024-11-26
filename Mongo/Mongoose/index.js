const mongoose = require('mongoose');

main().then( ()=>{
    console.log('connected to db');  //promise resolve
}).catch(err => console.log(err));  //if error occured 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}


const userSchema = new mongoose.Schema({  //Schema 
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User",userSchema);  //collection created

const user1 = new User({
    name: "Kunal",
    email: "kunal@gmail.com",
    age: 25,
});   //document created in the users collections

const user2 = new User({
    name: "Rohan",
    email:"Rohan@gmail.com",
    age: 30,
});

user2.save().then((res) =>{   //save in the DB
    console.log(res);
}).catch((err)=>{
    console.log(err);
});