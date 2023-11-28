

import express from 'express';
import * as mysql from 'mysql2';

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  database: ''
})
