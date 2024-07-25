//import mongoose
const mongoose = require('mongoose')

//create a schema
const userSchema = new mongoose.Schema({
    FirstName:String,
    LastName:String,
    email:String,
    passwordHash:String,
    role: {
type:String,
enum :['user','admin'],
default:'user'
    }
})
//create a model
module.exports = mongoose.model('User',userSchema,'users')