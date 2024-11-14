//EJS(Embedded Javascript Templates)

const express = require("express");
const path = require("path");

let app = express();

const port =  8080;

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"path"))

app.get('/',(req,res) =>{
    res.render("home.ejs");
})

app.listen( port , () => {
    console.log(`listening from the port ${port} `);
}) 


