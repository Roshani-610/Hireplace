let Job = require('../models/job-DB');

exports.questionIndex = async function(req, res) {
	try {
		let jobId = req.params.id;
		let job = await Job.findById(jobId).populate('questions');
		let questions = job.questions;
		res.render('index-question', { questions, jobId });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
	}
};

exports.questionNew = async function(req, res) {
	let jobId = req.params.id;
	res.render('new-question', { jobId });
};

exports.questionCreate = async function(req, res) {
	try {
		// 1. create a question
		// 2. save that question
		// 3. add that question into the corresponding job
		// 4. save new job
		let question = new Question(req.body.question);
		await question.save();
		let job = await Job.findById(req.params.id);
		job.questions.push(question);
		await job.save();
		req.flash('success', 'Successfully posted question');
		res.redirect('/jobs/${req.params.id}/questions');
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
	}
};

exports.questionDelete = async function(req, res) {
	try {
		await Question.findByIdAndDelete(req.params.questionID);
		req.flash('success', 'Successfully deleted question');
		res.redirect('/jobs/${req.params.id}/questions');
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
	}
};

exports.questionTest = async function(req, res) {
	try {
		// validations:user can only give test once, selected/rejected users cannot give test
		// 1. extract job
		// 2. populate questions
		// 3. render test form
		let job = await Job.findById(req.params.id).populate('questions');
		res.render('test', { job });
	} catch (error) {
		console.log(error);
	}
};

exports.questionAns = async function(req, res) {
	try {
		// req.body.answers -> array
		let job = await Job.findById(req.params.id).populate('questions');
		let questions = job.questions;
		let marks = 0;
		let required = 0.75 * questions.length;
		for (let i in questions) {
				console.log('user answer: ' + req.body.answers[i]);
				console.log('correct answer:' + questions[i].correctAns);
				if (questions[i].correctOption === req.body.answers[i]) {
					marks += 1;
				}
		}
		if (marks >= required) {
			return res.send('you passed the test with ${marks} marks');
		} else {
			return res.send('you failed the test with ${marks} marks');
		}
	} catch (error) {
		console.log(error);
	}
};
