let express = require('express'),
	questionController = require('../controllers/questions');
let router = express.Router();
let Question = require('../models/question_DB');
let Job = require('../models/job-DB');
let { isLoggedIn, isAdmin } = require('../middlewares/index');
// index (nesting)
router.get('/jobs/:id/questions', isLoggedIn, isAdmin, questionController.questionIndex);

// new
router.get('/jobs/:id/questions/new', isLoggedIn, isAdmin, questionController.questionNew);

// create
router.post('/jobs/:id/questions', isLoggedIn, isAdmin, questionController.questionCreate);

// delete
router.delete('/jobs/:id/questions/:questionID', isLoggedIn, isAdmin, questionController.questionDelete);

// TESTS
router.get('/jobs/:id/test', questionController.questionTest);

router.post('/jobs/:id/test', questionController.questionAns);

module.exports = router;