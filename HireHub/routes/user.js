let express = require('express'),
	userController = require('../controllers/user');
let router = express.Router();
let User = require('../models/user-DB');
let { isLoggedIn, isAdmin } = require('../middlewares/index');

// show
router.get('/users/:id', userController.showUser);

// edit
router.get('/users/:id/edit', isLoggedIn, isAdmin, userController.editUser);

// update
router.patch('/users/:id', isLoggedIn, isAdmin, userController.updateUser);

// delete
router.delete('/users/:id', isLoggedIn, isAdmin, userController.daleteUser);

module.exports = router;