//import mongoose
const mongoose = require('mongoose')

//create a schema
const userSchema = new mongoose.Schema({
    FirstName:String,
    LastName:String,
    email:String,
    passwordHash:String
})
//create a model
module.exports = mongoose.model('User',userSchema,'users')