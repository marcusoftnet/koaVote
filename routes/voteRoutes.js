var parse = require('co-body');
var route = require('koa-route');
var render = require('../lib/render');
var utils = require('./utils.js');
var votes = utils.votes;
var questions = utils.questions;

module.exports = function (app) {
	// routes
	app.use(route.get('/vote', showAddVote));
	app.use(route.post('/vote', addVote));
	app.use(route.get('/vote/:id/comment', showAddComment));
	app.use(route.post('/vote/:id/comment', addComment));
	app.use(route.get('/vote/export/:format', exportTo));

	// handlers
	function *showAddVote() {
		if(!utils.exists(this.query.questionId)){
			this.set('ErrorMessage', "No questionId passed to page");
			this.redirect('/');
			return;
		}
		var questionId = this.query.questionId;
		var question = yield questions.findOne(questionId);

		if(!utils.exists(question)){
			this.set('ErrorMessage', "No question found for id: '" + questionId + "'");
			this.redirect('/');
			return;
		}

		question.tagString = question.tags.join(',');
		question.id = question._id.toString();

		this.body = yield render('newVote', { question : question });
	};

	function *addVote() {
		var vote = yield parse(this);

		// Validate
		var errorRedirectUrl = '/vote?questionId=' + vote.questionId;
		if(!utils.existsAndNonEmpty(vote.questionId)){
			this.set('ErrorMessage', 'QuestionId required');
			this.redirect(errorRedirectUrl);
			return;
		}
		if(!utils.existsAndNonEmpty(vote.voteValue)){
			this.set('ErrorMessage', 'Vote value required');
			this.redirect(errorRedirectUrl);
			return;
		}

		// Create it
		vote.tags = utils.splitAndTrimTagString(vote.tagString);
		delete vote.tagString;
		vote.created_at = new Date;

		// Store it!
		var v = yield votes.insert(vote);
		this.redirect('/vote/' + v._id + '/comment');
	};

	function *showAddComment(id) {
		var vote = yield votes.findById(id);
		this.body = yield render('comment', { voteId : id, questionId : vote.questionId });
	};

	function *addComment(id){
		var posted = yield parse(this);

		var vote = yield votes.findAndModify(
				{_id : id },
				{ $set: {comment : posted.comment }}
		);

		this.redirect('/vote?questionId=' + vote.questionId);
	};

	function *exportTo(format) {
		var voteList = yield votes.find({});

		if (format === 'xls') {
			this.set('Content-Disposition', 'attachment;filename=data.xls');
			this.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			this.body = yield render('list', { votes: voteList });
			return;
		}

		// default to json
		this.type = 'json';
		this.body = voteList;
	};
};