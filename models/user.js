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
    },
    cart: [{ 
        art: { type: mongoose.Schema.Types.ObjectId, ref: 'Art' },
        quantity: { type: Number, default: 1 }
     }]
})
//create a model
module.exports = mongoose.model('User', userSchema, 'users') 