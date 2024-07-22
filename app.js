//require express

const express = require('express');

//import the routes

const userRouter = require('./routes/userRoutes');

//create a new express app

const app = express();

//use the express json middleware

app.use(express.json());

//define the endpoint

app.use('/api/users',userRouter);



//export the app

module.exports = app;
