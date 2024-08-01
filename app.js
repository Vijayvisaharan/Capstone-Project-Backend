//require express

const express = require('express');

//import the routes

const userRouter = require('./routes/userRoutes');
const artRouter = require('./routes/artRoutes');

//create a new express app

const app = express();

//require cors

const cors = require('cors');

//require cookie parser

const cookieParser = require('cookie-parser');

// //require morgan

const morgan = require('morgan');

//use the cors middleware

app.use(cors({
    origin: 'https://capstone-project-frontend.netlify.app/', // my frontend URL
    credentials: true
  }));
    

//use the cookie parser middleware

app.use(cookieParser());

//use the morgan middleware

app.use(morgan('dev'));

//use the express middleware 

app.use(express.json());

//define the endpoint
// app.get('/api', (req, res) => {
//     res.send('Hello World!');
// });
app.use('/api/users',userRouter);
app.use('/api/arts', artRouter);



//export the app

module.exports = app;
