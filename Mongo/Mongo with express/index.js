const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().then(()=>{
    console.log("Connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const port = 8080;

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
});

app.get("/",(req,res)=>{
    res.send("Hello World");
})
