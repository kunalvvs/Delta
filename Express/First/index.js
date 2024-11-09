const express = require('express');

const app = express();
// console.dir(app);

let port = 3000;

app.listen(port, ()=> {
    console.log(`app is listening on port ${port}`)
});


// app.use((req,res) => {            //request
//     console.log("request received");

//     // res.send("This is response");      //response
//     res.send("<h1>Fruits</h1>");
// }); //here semicolon is optional

app.post(('/') ,(req,res)=> {
    res.send("Connected with the Post root");
});

app.get(('/') ,(req,res)=> {
    res.send("Connected with the root path");
});



// app.get(('/a') ,(req,res)=> {    //routing
//     res.send("Connected with the a");
// });
// app.get(('/b') ,(req,res)=> {
//     res.send("Connected with the b");
// });

// app.get(('*') ,(req,res)=> {
//     res.send("Page not found");
// });


app.get("/:username/:id" ,(req,res)=>{    //Path parameter
    let {username,id} = req.params;
    let htmls = `<h1>Welcome to the @${username}</h1>`;
    res.send(htmls);
});

app.get("/search", (req,res) =>{
    let {q} = req.query;
    console.log(req.query);
    if(!q)
    {
        res.send("Nothing searched");
    }
    res.send(`No result about ${q}`);
})