const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
let app = express();


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

app.get("/",(req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q ,
        (err, results) => {
            if (err) throw err;
            console.log(results);    //print the data
          res.send(results);
        });
    }
    catch (err)
    {
        console.log(err);
        res.send("some error in DB");
    }
  
})

app.listen("8080",()=>{
  console.log("Server is running on port 8080");
})