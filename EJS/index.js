//EJS(Embedded Javascript Templates)

const express = require("express");
const path = require("path");  //with this can run the server from the another path(parent path)

let app = express();

const port =  8080;

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"/views"));   //__dirname identify the current directory of the index.js


app.get('/',(req,res) =>{
    res.render("home.ejs");  //render is used to redirect the views/home.ejs
})

app.get('/rolldice',(req,res) =>{  //another route
    let diceval = Math.floor(Math.random()*6)+1;  //2nd method to passing the data
    res.render("rolldice",{diceval});
})


app.get("/ig/:username",(req,res)=>{  //here is the another route(page) for creating instagram profile route
//    const followers = ["Rahul","Dinu","Kelvin","Rabbitd"];
    let {username } = req.params;
    let instaData = require("./data.json");
    let data = instaData[username];
    // console.log(data);
    if(data){
    res.render("instagram.ejs",{data});
    }
    else
    {
        res.render("error"); 
    }
    
})


app.listen( port , () => {
    console.log(`listening from the port ${port} `);
}) 


