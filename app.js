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
    origin: 'http://localhost:5713',
    credentials: true

}));

//use the cookie parser middleware

app.use(cookieParser());

//use the morgan middleware

app.use(morgan('dev'));

//use the express middleware 

app.use(express.json());

//define the endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Here is your data' });
});
app.use('/api/users',userRouter);
app.use('/api/arts', artRouter);



//export the app

module.exports = app;
