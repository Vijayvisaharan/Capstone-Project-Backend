//import the user model
const User = require('../models/user');



//import the bcryptjs for password hashing
const bcrypt = require('bcrypt');

//import the jsonwebtoken for the generate token
const jwt = require('jsonwebtoken');

//define the user controller
const userController = {

    //define the register or sign up method
    register: async (req, res) => {
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
    },

    //login method
    login: async (req, res) => {

        try {
            //get the user data from the body requset
            const { email, password } = req.body;

            //check if the user exists
            const user = await User.findOne({ email });

            //if user does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }
            //if user exists check if the password is correct
            const isPasswordcorrect = await bcrypt.compare(password, user.passwordHash);

            //if password is incorrect
            if (!isPasswordcorrect) {
                return res.status(400).json({ message: 'invalid credencials' })
            }

            //if password is correct ,generate token and return the user to success message 
            const token = jwt.sign({
                email: user.email,
                id: user._id
            }, process.env.JWT_SECRET)


            //set cookie with token
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),//24 hours expiration
            })

            res.status(200).json({ message: 'user logged in successfully', token })


        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    //get the current loggedin user
    getCurrentuser: async (req, res) => {
        try {
            //get the user id from requset object
            const userId = req.userId;

            //find the user by id from database
            const user = await User.findById(userId).select('-passwordHash -__v -_id');

            //if the user does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //return the user
            res.status(200).json({ user })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //update the user
    update: async (req, res) => {
        try {
            //get the user id from requset object
            const userId = req.userId;

            //get the user data from the body requset
            const { FirstName, LastName, email } = req.body;

            //find the user by id from database
            const user = await User.findById(userId);

            //if the user does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //update the user
            if (FirstName) user.FirstName = FirstName || user.FirstName;
            if (LastName) user.LastName = LastName || user.LastName;
            if (email) user.email = email || user.email;

            //save the user
            const updateUser = await user.save();

            //return the user
            res.status(200).json({ message: 'user updated successfully', user })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //delete the user
    delete: async (req, res) => {
        try {
            //get the user id from requset object
            const userId = req.userId;

            //delete the user by id from database
            const deleteUser = await User.findByIdAndDelete(userId);

            //if the user does not exist
            if (!deleteUser) {
                return res.status(400).json({ message: 'user not found' })
            }



            //return the user
            res.status(200).json({ message: 'user deleted successfully' })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    //logout the user
    // logout: async (req, res) => {
    //     try {
    //         //clear the cookie
    //         res.clearCookie('token',{
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: 'none',
    //         });

    //         //retun logout message
    //         res.status(200).json({ message: 'user logged out successfully' })

    //     } catch (error) {
    //         res.status(500).json({ message: error.message });

    //     }
    // }
    logout: async (req, res) => {
        try {
            //clear the cookie
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            //retun logout message
            res.status(200).json({ message: 'user logged out successfully' })

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    },
    //get the all users
    getAllUsers: async (req, res) => {
        try {
            //get all users from database
            const users = await User.find().select('-passwordHash -__v ');

            //return the users
            res.status(200).json({ users })

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    },

    //get the user by id
    getUserById: async (req, res) => {
        try {
            //get the user id from the request params
            const userId = req.params.id;

            //find the user by id from database
            const user = await User.findById(userId).select('-passwordHash -__v ');

            //if the user does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //return the user
            res.status(200).json({ user })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    //update the user by id
    updateUserById: async (req, res) => {
        try {
            //get the user id from the request params
            const userId = req.params.id;

            //get the user data from the body requset
            const { FirstName, LastName, email } = req.body;

            //find the user by id from database
            const user = await User.findById(userId);

            //if the user does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //update the user
            if (FirstName) user.FirstName = FirstName || user.FirstName;
            if (LastName) user.LastName = LastName || user.LastName;
            if (email) user.email = email || user.email;

            //save the user
            const updateUser = await user.save();

            //return the user
            res.status(200).json({ message: 'user updated successfully', user })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //delete the user by id
    deleteUserById: async (req, res) => {
        try {
            //get the user id from the request params
            const userId = req.params.id;

            //delete the user by id from database
            const deleteUser = await User.findByIdAndDelete(userId);

            //if the user does not exist
            if (!deleteUser) {
                return res.status(400).json({ message: 'user not found' })
            }


            //return the user
            res.status(200).json({ message: 'user deleted successfully' })

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    }
}
//export the user controller
module.exports = userController;