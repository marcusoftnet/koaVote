var render = require('../lib/render');
var questions = require('./utils.js').questions;
var votes = require('./utils.js').votes;

/**
 * Show the result page
 */
module.exports.showResults = function *() {
	// var q = yield questions.find();
	// var voteList = yield votes.find({ questionId : qId });
	this.body = yield render('results');
};