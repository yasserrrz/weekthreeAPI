

import express from 'express';
import * as mysql from 'mysql2';

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assingment'
});

app.get('/' , (req , res , next)=>{
    res.json({mesage:"done"})
})

app.listen(port , ()=>{
    console.log('server Running on localhost:')
})
