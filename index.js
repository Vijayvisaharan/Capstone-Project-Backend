//import mongoose from 'mongoose';

const mongoose = require('mongoose');
//import config module;
const config = require('./utils/config');
console.log('connecting to mongodb');

//connect to mongodb

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB', err)
    });