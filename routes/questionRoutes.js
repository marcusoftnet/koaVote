var parse = require('co-body');
var route = require('koa-route');
var render = require('../lib/render');
var utils = require('./utils.js');
var questions = utils.questions;

module.exports = function (app) {
	// routes
	app.use(route.get('/question/new', showAddQuestion));
	app.use(route.post('/question/new', addQuestion));
	app.use(route.get('/question/:id', showQuestion));
	app.use(route.post('/question/:id/update', updateQuestion));

	// handlers
	function *showAddQuestion() {
		this.body = yield render('newQuestion');
	};

	function *showQuestion(id) {
		var question = yield questions.findById(id);
		question.id = question._id.toString();
		this.body = yield render('question', { question : question });
	};

 	function *addQuestion() {
		var postedData = yield parse(this);
		var newQuestionURL = '/question/new';

		// Validate
		if(!utils.existsAndNonEmpty(postedData.questionTitle)){
			this.set('ErrorMessage', 'Question required');
			this.redirect(newQuestionURL);
			return;
		}

		if(!utils.existsAndNonEmpty(postedData.thankYouText)){
			this.set('ErrorMessage', 'Thank you note required');
			this.redirect(newQuestionURL);
			return;
		}

		if(!utils.existsAndNonEmpty(postedData.commentTitle)){
			this.set('ErrorMessage', 'A title for the comment box is required');
			this.redirect(newQuestionURL);
			return;
		}

		var question = createQuestionFromPostedData(postedData);
		var q = yield questions.insert(question);

		this.redirect('/question/' + q._id);
	};

	function *updateQuestion(id) {
		var questionUrl = '/question/' + id;
		var postedData = yield parse(this);

		// Validate
		if(!utils.existsAndNonEmpty(postedData.questionTitle)){
			this.set('ErrorMessage', 'Question required');
			this.redirect(questionUrl);
			return;
		}

		if(!utils.existsAndNonEmpty(postedData.thankYouText)){
			this.set('ErrorMessage', 'Thank you note required');
			this.redirect(questionUrl);
			return;
		}

		if(!utils.existsAndNonEmpty(postedData.commentTitle)){
			this.set('ErrorMessage', 'A title for the comment box is required');
			this.redirect(questionUrl);
			return;
		}

		var question = createQuestionFromPostedData(postedData);
		var q = yield questions.updateById(id, question);

		this.redirect(questionUrl);
	};

	function createQuestionFromPostedData(postedData){
		return {
			hospital : postedData.hospital,
			questionTitle : postedData.questionTitle,
			tags : utils.splitAndTrimTagString(postedData.tagString),
			thankYouText : postedData.thankYouText,
			commentTitle : postedData.commentTitle,
			created_at : new Date
		};
	};
};