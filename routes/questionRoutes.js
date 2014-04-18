/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('../lib/render');
var config = require('../config')();

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var questions = wrap(db.get('questions'));

/**
 * Show question adding page
 */
module.exports.showAddQuestion = function *add() {
	this.body = yield render('newQuestion');
};


/*
 ** shows the question data
*/
module.exports.showQuestion = function *(id) {
	var question = yield questions.findById(id);
	question.id = question._id.toString();
	this.body = yield render('question', { question : question });
};

/**
 * Add new question
 */
module.exports.addQuestion = function *() {
	var question = createQuestionFromPostedData(yield parse(this));

	var q = yield questions.insert(question);

	this.redirect('/question/' + q._id);
};

function createQuestionFromPostedData(postedData){
	return {
		hospital : postedData.hospital,
		questionTitle : postedData.questionTitle,
		tags : trimTags(postedData.tagString.split(',')),
		created_at : new Date
	};
};

function trimTags(tags){
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].trim();
	};
	return tags;
};
