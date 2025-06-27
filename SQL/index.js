const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password : 'Server404#'
});

try{
connection.query("SHOW TABLES" , 
    (err, results) => {
        if (err) throw err;
    });
}
catch (err)
{
    console.log(err);
}

let getRandomUser = ()=> {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(getRandomUser());