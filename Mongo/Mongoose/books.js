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
        required:true,   //schema validation options type
        minLength: 20,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
         min : [1,"price is too less"], //custom error msg
    },
    discount:{
        type:Number,
        default:0,           //schema type options
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"],
    }
});

const Book = new mongoose.model("Book",bookSchema);

// let book1 = new Book({
//     title: "Harry Potter 2.0   hbdjw  gcskg fgvwgver  fgvefbvk egve",
//     author: "J.K. Rowling",
//     price: 20.99,
//     category: "fiction",
// });

// book1.save().then(res=> {
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// });

// Book.find().then(res=>{
//     console.log(res)
// });

Book.findByIdAndUpdate("67482537103b48d0b499cda9",{price:-2},{runValidators:true}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err.errors.price.properties.message)   //erros msg from price category
});