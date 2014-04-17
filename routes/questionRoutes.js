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
 * Show voting page
 */
module.exports.showAddQuestion = function *add() {
	this.body = yield render('newQuestion');
};

/**
 * Add new question
 */
module.exports.addQuestion = function *() {
	var question = yield parse(this);
	question.tags = trimTags(question.tagString.split(','));
	question.created_at = new Date;

	var q = yield questions.insert(question);
	this.redirect('/question/new/' + q._id);
};

function trimTags(tags){
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].trim();
	};
	return tags;
};