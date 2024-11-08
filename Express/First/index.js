const express = require('express');

const app = express();
// console.dir(app);

let port = 3000;

app.listen(port, ()=> {
    console.log(`app is listening on port ${port}`)
});


// app.use((req,res) => {
//     console.log("request received");

//     // res.send("This is response");
//     res.send("<h1>Fruits</h1>");
// }); //here semicolon is optional

app.post(('/') ,(req,res)=> {
    res.send("Connected with the Post root");
});

app.get(('/') ,(req,res)=> {
    res.send("Connected with the root");
});

app.get(('/a') ,(req,res)=> {
    res.send("Connected with the a");
});
app.get(('/b') ,(req,res)=> {
    res.send("Connected with the b");
});

app.get(('*') ,(req,res)=> {
    res.send("Page not found");
});