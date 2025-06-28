const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
let app = express();
const path = require("path");

app.set("view engine" , "ejs" );
app.set("views" ,path.join(__dirname,"/views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password : 'Server404#'
});

//Inserting new data
let q = "INSERT INTO user (id,username,email,password) VALUES  ? ";


let getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// let data = [];

// for(let i=0;i<100;i++){
//   data.push(getRandomUser());    //fake 100 user
// }

// try{
// connection.query(q , [data],
//     (err, results) => {
//         if (err) throw err;
//         console.log(results);    //print the data
//         console.log(results.length);
//         console.log(results[0]);
//     });
// }
// catch (err)
// {
//     console.log(err);
// }

// connection.end();


// console.log(getRandomUser());



//Home Page Route
app.get("/",(req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q ,
        (err, results) => {
            if (err) throw err;
            let count = results[0] ["count(*)"];    //print the data
          res.render("home.ejs",{count});
        });
    }
    catch (err)
    {
        console.log(err);
        res.send("some error in DB");
    }
  
})

//Show User Route
app.get("/user",(req,res)=>{
  let q = `SELECT * FROM user`;
  try{
    connection.query(q ,
      (err, users) =>
        {
          if (err) throw err;
          res.render("user.ejs",{users});
          });
}
catch (err)
{
  res.send("Error found in DB");
}
})


//EDIT route
app.get("/user/:id/edit", (res,req)=>{
  let q = `SELECT * FROM user WHERE id = ?`;
  try{
    connection.query(q,[req.params.id],
      (err, user) =>
        {
          if (err) throw err;
          res.render("edit.ejs",{user});
          });
        }
        catch(err)
        {
          res.send("some error found");
        }
})


app.listen("8080",()=>{
  console.log("Server is running on port 8080");
})