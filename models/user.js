//import mongoose
const mongoose = require('mongoose')

//create a schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    passwordHash: String,
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})
//create a model
module.exports = mongoose.model('User', userSchema, 'users')