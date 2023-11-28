

/**
 * Assignment 4:
*using  mysql   and express * 
create two tables
user table (name , email , password ,age)
product table (pName , pDescription, price, createdby)

-user APIs-
1- add user (user must not found before)
2- update user 
3- delete user(user must be found)
4- search for user where his name start with "a" and age less than 30 => using like for characters
5- search for users by list of ids => using IN
6- get all user 
7- get all users with products

-product APIs-
1- add product(product must not found before)
2- delete product (product owner only can do this and product must be found )
3- update product (product owner only)
4- get all products 
5- search for products where price greater than 3000

 */



import express, { query } from 'express';
import * as mysql from 'mysql2';

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assingment'
});

app.post('user' , (req , res )=>{
    const {name , email , password , age} = req.body ; 
     const query = `INSERT INTO users( name ,email ,password ,age) VALUES ('${name}' , '${email}', '${}') `
    connection.execute(query,(error, results, fields)=>{
        if(error){
            return res.json({message : 'query error', error})
        }
        
    })
})





app.listen(port , ()=>{
    console.log(`server Running on  http://localhost/${port}`)
})
