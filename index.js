//import mongoose from 'mongoose';

const mongoose = require('mongoose');

//import config module;

const config = require('./utils/config');

//import app module

const app = require('./app');

console.log('connecting to MongoDB...');

//connect to mongodb

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB...')

     //start the server
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err)
    });

