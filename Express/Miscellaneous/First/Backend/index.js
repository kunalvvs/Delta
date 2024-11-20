const express = require("express");
const app = express();

const port = 8080;

app.use(express.urlencoded({extended:true}));  // for the POST 
app.use(express.json());    

app.listen(port,() =>{
    console.log("Server is running on port 8080");
});

app.get("/register",(req,res)=>{
    let {user,password} = req.query;   //to get the username using GET
    res.send(`Get Response accepted, Welcome ${user}`);
    
});

app.post("/register",(req,res)=>{
    let {user,password} = req.body; // TO get the Username using POST
    res.send(`Post Response accepted, Welcome ${user}`);
});
