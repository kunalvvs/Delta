const express = require("express");
const app = express();

const port = 8080;

app.listen(port,() =>{
    console.log("Server is running on port 8080");
});

app.get("/register",(req,res)=>{
    res.send("Get Response accepted");
    
});

app.post("/register",(req,res)=>{
    res.send("Post Response accepted");
});
