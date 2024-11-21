const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
 const methodOverride = require('method-override');



app.use(express.urlencoded({extended:true})); //when POST used for submit the form or data
app.use(methodOverride('_method'))


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

let posts= [
    {id:uuidv4(),username:"apnacollege",content:"This is the first post"},
    {id:uuidv4(),username:"dinu",content:"This is the second post"},
    {id:uuidv4(),username:"kelivin",content:"This is the third post"},
];



app.get("/posts",(req,res)=>{
    res.render("index",{posts});  //for render a all post route(index.ejs)
})


app.get("/posts/new",(req,res)=>{
    res.render("new");  //for render the create post route(new.ejs)
})

app.post("/posts",(req,res)=>{  //to send req of new post to adding in the posts route
    let {username,content} = req.body; //destructure , req.body supported in POST
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("posts");
})

app.get("/posts/:id",(req,res)=>{      
    let {id} = req.params;
  let post = posts.find((p) => id === p.id );
    res.render("show.ejs" , {post})
});

app.patch("posts/:id",(req,res)=>{    //edit the post
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id );
    post.content = newContent;
    res.redirect("/posts");
    console.log(post);
    
    
})


app.get("/posts/:id/edit",(req,res)=>{     //get with edt route
    let {id} = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit",{post});

  
})