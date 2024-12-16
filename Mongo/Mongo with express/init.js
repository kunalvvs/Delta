const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("Connection successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from:"Neha",
        to:"Rahul",
        msg:"I think i can write anything here",
        created_at: new Date() 
    },
    {
        from:"Martin",
        to:"Guptil",
        msg:"Great things in life matters only",
        created_at: new Date() 
    },
    {
        from:"Dijkat",
        to:"Diljit",
        msg:"Hi Dililuminati",
        created_at: new Date() 
    },
    {
        from:"Amit",
        to:"Raman",
        msg:"I am gonna college, whats your plan",
        created_at: new Date() 
    }
];

Chat.insertMany(allChats);

