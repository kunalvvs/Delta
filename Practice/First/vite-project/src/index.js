const express = require("express");
const app = express();

const port = 5173;

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});

app.get("/",(req,res)=>{
    res.render("app.jsx");
});