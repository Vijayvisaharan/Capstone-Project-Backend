const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

const auth = {
    isAuth: (req, res, next) => {
        try {
            // det the token from the request cookie
            const token = req.cookies.token;

            //if the token is not present, return an error message 
            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            //verify the token
            try {
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

                //get the user from the decode token
                //attach it to request object
                req.userId = decodedToken.id;

                //call the next middleware
                next();
            } catch (err) {
                return res.status(401).json({ error: 'Invalid Token' });
            }
        }
        // isAdmin: (req, res, next) => {
        //     if (req.user.role !== 'admin') {
        //         return res.status(403).json({ error: 'Forbidden' });
        //     }
        //     next();
        catch (error) {
            return res.status(500).json({ message: error.message});

        }
    },

    isAdmin: async(req, res, next) => {
        try {
            //get the user from the request object
            const userId = req.userId;

            //find the user by id
            const user = await User.findById(userId);
            
            //if the user is not found, return an error message
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            //if the user is not an admin, return an error message
            if (user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }

            //call the next middleware
            next();
        }  
         catch (error) {
            return res.status(500).json({ message: error.message});
        }
    }
} 
//export default auth;
module.exports = auth;