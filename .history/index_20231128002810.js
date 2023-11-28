

/**
 * Assignment 4:
*using  mysql   and express * 
create two tables
user table (name , email , password ,age)
product table (pName , pDescription, price, createdby)

-user APIs-
1- add user (user must not found before)  Done
2- update user  Done
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



import express, { json, query } from 'express';
import * as mysql from 'mysql2';

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assingment'
});


app.use(json());



app.post('/users', (req, res) => {
    const { name, email, password, age } = req.body;
    console.log({ name, email, password, age })
    //  const query = `INSERT INTO users( name ,email ,password ,age) VALUES ('${name}' , '${email}', '${password}',${age}) `
    const query = `
  INSERT INTO users (name, email, password, age)
  SELECT '${name}', '${email}', '${password}', ${age}
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE email = '${email}'
  );
`;

    connection.execute(query, (error, results, fields) => {
        if (error) {
            return res.json({ message: 'query error', error })
        }
        const {affectedRows} = results ;
        return affectedRows? res.json({message:"user Added succesfully"}) : res.json({message:"User allready exist"}) 
    })
})



app.put('/users', (req, res) => {
    const { id,name, email, password, age } = req.body;
    console.log({id,name, email, password, age })
   
//     const query = `
//   UPDATE users SET ${name?'name' = name:''} ${email?'email' = email:''} ${password?'password' = password:''} ${age?'age' = age:''}  WHERE id = ${id};
// `;
const query = `
  UPDATE users
  SET 
    ${name ? `name = '${name}',` : ''}
    ${email ? `email = '${email}',` : ''}
    ${password ? `password = '${password}',` : ''}
    ${age ? `age = ${age}` : ''}
  WHERE id = ${id};
`;

    connection.execute(query, (error, results, fields) => {
        if (error) {
          
            return res.json({ message: 'query error',error})
        }
        console.log(results)
        const {affectedRows} = results ;
        if(affectedRows){

          return   res.json({message:"user Updated succe " , results}) 
        }
      
   
    })
})




app.listen(port, () => {
    console.log(`server Running on  http://localhost/${port}`)
})
