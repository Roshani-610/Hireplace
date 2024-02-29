let User = require('../models/user-DB');

exports.showUser = async function(req, res) {
	try {
		let user = await User.findById(req.params.id);
		res.render('show-user', { user });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log('problem while fetching user', error);
	}
};

exports.editUser = async function(req, res) {
	try {
		let user = await User.findById(req.params.id);
		res.render('edit-user', { user });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log('problem while fetching user', error);
	}
};

exports.updateUser = async function(req, res) {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body.user);
		req.flash('success', 'Successfully updated your profile!');
		res.redirect('/users/${req.params.id}');
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log('problem while updating user', error);
	}
};

exports.daleteUser = async function(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id);
		req.flash('success', 'Successfully deleted your profile!');
		res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log('problem while deleting user', error);
	}
};