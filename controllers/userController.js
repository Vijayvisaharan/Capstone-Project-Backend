//import the user model
const User = require('../models/user');

//import the bcryptjs for password hashing
const bcrypt = require('bcrypt');

//define the user controller
const userController = {

    //define the register or sign up method
    register: async(req,res) => {
    try {

        //get the user data from the request body
        const { FirstName, LastName, email, password } = req.body;

        //check if the user already exists
        const user = await User.findOne({ email });

        //check if the user already exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({
            FirstName,
            LastName,
            email,
            passwordHash
        });
        //save the user
        await newUser.save();

        //return the user
        res.status(201).json({ message: 'User created successfully', user: newUser });

    }
    catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
//export the user controller
module.exports = userController;