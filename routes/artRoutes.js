const express = require('express');
const artRouter = express.Router();
const artController = require('../controllers/artController');
const auth = require('../middleware/auth');
const art = require('../models/art');

//define the routses
artRouter.post('/create', auth.isAuth, auth.isAdmin, artController.createArt);

//user interface
artRouter.get('/all', artController.getAllArts);
artRouter.get('/cart/total', auth.isAuth, artController.getCartTotal);

//cart routes
artRouter.get('/cart', auth.isAuth, artController.getAddedArts);
artRouter.get('/cart/:artId', auth.isAuth, artController.getAddedArtById);
artRouter.put('/cart/:artId', auth.isAuth, artController.updateAddedArtQuantity);
artRouter.delete('/cart/:artId', auth.isAuth, artController.removeAddedArt);

artRouter.get('/search', artController.getArtsByCategory);
artRouter.get('/search/title', artController.searchArtByTitle);
artRouter.get('/search/artist', artController.searchArtByArtist);
artRouter.get('/search/price', artController.filterArtByPrice);


//user interface get by id
artRouter.get('/:artId', auth.isAuth, artController.getArtById);

//admin interface
artRouter.put('/:artId', auth.isAuth, auth.isAdmin, artController.updateArt);
artRouter.delete('/:artId', auth.isAuth, auth.isAdmin, artController.deleteArt);

//addTocart
artRouter.post('/:artId/add', auth.isAuth, artController.addArtCart);








//export the router
module.exports = artRouter;