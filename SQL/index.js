const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password : 'Server404#'
});

let q = "SHOW TABLES";

try{
connection.query(q , 
    (err, results) => {
        if (err) throw err;
        console.log(results);    //print the data
        console.log(results.length);
        console.log(results[0]);
    });
}
catch (err)
{
    console.log(err);
}

connection.end();

let getRandomUser = ()=> {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(getRandomUser());