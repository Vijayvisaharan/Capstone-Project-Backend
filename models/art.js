const mongoose = require('mongoose');


//define the art schema Users can view all artwork information including title, artist, description, price, and images. 
const artSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    artist: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    catagory: {
        type: String,
        enum: ['painting', 'sculpture', 'photography', 'drawing', 'other'],
        default: 'other'
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    quantity: {
        type: Number,
        default: 1
    },
    comments:{

    }
});

//export the art model
module.exports = mongoose.model('Art', artSchema, 'art');
