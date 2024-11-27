const mongoose = require("mongoose");

main().then( ()=>{
    console.log('connected to db');  //promise resolve
}).catch(err => console.log(err));  //if error occured 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

}


const bookSchema = new mongoose.Schema({  //Schema 
    title: {
        type: String,   //long form and better also
        required:true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const Book = new mongoose.model("Book",bookSchema);

let book1 = new Book({
    title: "Harry Potter 2.0",
    author: "J.K. Rowling",
    price: 20.99,
});

book1.save().then(res=> {
    console.log(res)
}).catch(err=>{
    console.log(err)
});