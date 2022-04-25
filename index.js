const express = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

//create server express

const app = express();

//Database
dbConnection();

//CORSE
app.use(cors())

//public directory
app.use(express.static('public'));

//reading and parsing of the body
app.use(express.json())
//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


//listen
app.listen( process.env.PORT, () =>{
    console.log('The server is running')
})