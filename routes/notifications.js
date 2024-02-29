let express = require('express'),
	notifController = require('../controllers/notifications');
let router = express.Router();

let Notification = require('../models/notif-DB');
let { isLoggedIn, isAdmin } = require('../middlewares/index');

// index
router.get('/notifications', notifController.notifIndex);
 
// new
router.get('/notifications/new', notifController.newNotif);

// create
router.post('/notifications', notifController.createNotif);

// delete
router.delete('/notifications/:id', isLoggedIn, isAdmin, notifController.deleteNotif);

module.exports = router;