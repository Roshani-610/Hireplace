let Notification = require('../models/notif-DB');

exports.notifIndex = async function(req, res) {
	try {
        let allNotifs = await Notification.find({});
        res.render('index-notif.ejs', {allNotifs});
	} catch (error) {
          req.flash('error', 'Something went wrong in the database');
	 	console.log('error while fetching notifs', error);
	}
};

exports.newNotif = async function(req, res) {
	res.render('new-notif.ejs');
};

exports.createNotif = async function(req, res) {
	try {
        let notif = new Notification({
            body: req.body.body,
            author: req.body.author
       });
       await notif.save();
       req.flash('success', 'Successfully posted notification');
       res.redirect('/notifications');
   } catch (error) {
          req.flash('error', 'Something went wrong in the database');
          console.log('error while creating notif', error);
   }
};

exports.deleteNotif = async function(req, res) {
	try {
        await Notification.findByIdAndDelete(req.params.id);
        req.flash('success', 'Successfully deleted notification');
        res.redirect('/notifications');
   } catch (error) {
          req.flash('error', 'Something went wrong in the database');
          console.log('error while deleting notif', error);
   }
};