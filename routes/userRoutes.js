//import the express module
const express = require('express');

//import the user controller
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//import the express router
const userRouter = express.Router();

//define the endpoints
userRouter.post('/api/data', userController.register);
userRouter.post('/login',userController.login);

//authendicate route
userRouter.get('/getCurrentuser', auth.isAuth , userController.getCurrentuser);
userRouter.put('/getCurrentuser', auth.isAuth, userController.update);
userRouter.delete('/getCurrentuser', auth.isAuth, userController.delete);
userRouter.post('/logout',auth.isAuth, userController.logout);

//admin routes
userRouter.get('/api/data', auth.isAuth, auth.isAdmin, userController.getAllUsers);
userRouter.get('/:id', auth.isAuth, auth.isAdmin, userController.getUserById);
userRouter.put('/:id', auth.isAuth, auth.isAdmin, userController.updateUserById);
userRouter.delete('/:id', auth.isAuth, auth.isAdmin, userController.deleteUserById);

//export the router
module.exports = userRouter;