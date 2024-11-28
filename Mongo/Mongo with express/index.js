const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"/views")); 
app.use(express.static(path.join(__dirname,"public")));  //public folder 

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
    res.send("root is working");
})


let chat1 = new Chat({
    from:"Neha",
    to:"Rahul",
    msg:"Hello",
    created_at: new Date()  //it gives UTC format
});

// chat1.save().then(res=>{
//     console.log(res);
// }); 

app.get("/chats",(req,res)=>{  //index route
    Chat.find().then(data=>{
        // console.log(data);
        res.render("index.ejs",{data});
        })
})