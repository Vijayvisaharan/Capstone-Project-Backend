//import the art model
const Art = require('../models/art');

//import the user model
const User = require('../models/user');

//define the controller 
const artController = {

    //create a art
    createArt: async (req, res) => {
        try {
            //get the art data from the request body

            const { title, description, price, category, artist,images, location, status } = req.body;

            //get the user id from the request
            const { userId } = req;

            //create a new art
            const newArt = new Art({
                title,
                description,
                price,
                category,
                artist,
                location,
                images,
                status,
                createdBy: userId,
                cart: []
            });
            //save the art
            const saveArt = await newArt.save();

            //return the created messsage
            res.status(201).json({ message: 'Art created successfully', art: saveArt });

        } catch (error) {
            res.status(500).json({ message: 'Error creating art', error });
        }
    },

    //get all arts
    getAllArts: async (req, res) => {
        try {
            //find all arts
            const arts = await Art.find();

            //return the arts
            res.status(200).json({ arts });

        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }
    },

    //get a single art
    getArtById: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            //find the art by id
            const art = await Art.findById(artId);

            //return the art
            res.status(200).json({ art });

        } catch (error) {
            res.status(500).json({ message: 'Error getting art', error });
        }
    },

    //update a art
    updateArt: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            const updateArt = await Art.findByIdAndUpdate(artId, req.body, { new: true });

            //return the updated art
            res.status(200).json({ message: 'Art updated successfully', art: updateArt });

        } catch (error) {
            res.status(500).json({ message: 'Error updating art', error });
        }
    },

    //delete a art
    deleteArt: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            const deleteArt = await User.findByIdAndDelete(artId);

            //if the user does not exist
            if (!deleteArt) {
                return res.status(400).json({ message: 'Art not found' })
            }

            //return the user
            res.status(200).json({ message: 'Art deleted successfully' })

        } catch (error) {
            res.status(500).json({ message: 'Error deleting art', error });
        }
    },
    //add the art to particular folder to view for future use
    addArtCart: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            //get the folder id from the request body
            const { userId } = req;


            //find the art by id
            const art = await Art.findById(artId);

            if (!art) {
                return res.status(400).json({ message: 'Art not found' })
            }

            //find user by id
            const user = await User.findById(userId);

            //if the art does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            // const updateArt = await Art.findByIdAndUpdate(artId, {
            //     $push: {
            //         cart: userId
            //     }
            // }, {
            //     new: true
            // }
            // );

            //add the art to the folder
            art.cart = userId;

            //save the art
            const saveArt = await art.save();
            //already added to cart return the art

            //return the art
            res.status(200).json({ message: 'Art added to folder successfully', art: saveArt });

        } catch (error) {
            res.status(500).json({ message: 'Error adding art to folder', error });

        }
    },
    //get the all added arts
    getAddedArts: async (req, res) => {
        try {
            //get the folder id from the request
            const { userId } = req;

            //find the user by id
            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //find all arts
            const arts = await Art.find({ cart: userId });

            //return the arts
            res.status(200).json(arts);

        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }
    },

    //update added art by user quentity
    updateAddedArtQuantity: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            //get the user id from the request
            const { userId } = req;

            //find the art by id
            const art = await Art.findById(artId);

            if (!art) {
                return res.status(400).json({ message: 'Art not found' })
            }

            //find user by id
            const user = await User.findById(userId);

            //if the art does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //update the art quantity
            art.quantity = req.body.quantity;

            //save the art
            const saveArt = await art.save();

            //return the art
            res.status(200).json({ message: 'Art quantity updated successfully', art: saveArt });

        } catch (error) {
            res.status(500).json({ message: 'Error updating art quantity', error });

        }
    },      
    //user get added art by id
    getAddedArtById: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            //find the art by id
            const art = await Art.findById(artId);

            //return the art
            res.status(200).json({ art });

        } catch (error) {
            res.status(500).json({ message: 'Error getting art', error });
        }
    },

    //remove added art by user
    removeAddedArt: async (req, res) => {
        try {
            //get the art id from the request params
            const { artId } = req.params;

            const { userId } = req;

            //find the art by id
            const art = await Art.findById(artId);

            if (!art) {
                return res.status(400).json({ message: 'Art not found' })
            }

            //find user by id
            const user = await User.findById(userId);

            //if the art does not exist
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //remove the art from the folder
            art.cart = null;

            //save the art
            const saveArt = await art.save();

            //return the art
            res.status(200).json({ message: 'Art removed from folder successfully', art: saveArt });

        } catch (error) {
            res.status(500).json({ message: 'Error removing art from folder', error });

        }
    },
    getCartTotal: async (req, res) => {
        try {
            //get the folder id from the request
            const { userId } = req;

            //find the user by id
            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }

            //find all arts
            const arts = await Art.find({ cart: userId });

            //calculate the total price
            let totalPrice = 0;
            arts.forEach(art => {
                totalPrice += art.price * art.quantity;
            });

            //return the total price
            res.status(200).json({ totalPrice });

        } catch (error) {
            res.status(500).json({ message: 'Error getting total price', error });
        }
    },

    //fillter the art by category
    getArtsByCategory : async (req, res) => {
        try {
            //get the category from the request params
            const { category } = req.params;
    
            //find all arts
            const arts = await Art.find({ category });
    
            //return the arts
            res.status(200).json({ arts });
    
        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }
    },

    //search the art by title
    searchArtByTitle : async (req, res) => {
        try {
            //get the title from the request params
            const { title } = req.params;

            //find all arts
            const arts = await Art.find({ title });

            //return the arts
            res.status(200).json({ arts });

        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }
    },

    //get the art by artist
    searchArtByArtist : async (req, res) => {
        try {
            //get the artist from the request params
            const { artist } = req.params;

            //find all arts
            const arts = await Art.find({ artist });

            //return the arts
            res.status(200).json({ arts });

        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }
    
    },
    //filter the art by price
    filterArtByPrice : async (req, res) => {
        try {
            //get the price from the request params
            const { price } = req.params;

            //find all arts
            const arts = await Art.find({ price });

            //return the arts
            res.status(200).json({ arts });

        } catch (error) {
            res.status(500).json({ message: 'Error getting arts', error });
        }

    }
    

}



//export the art controller
module.exports = artController;