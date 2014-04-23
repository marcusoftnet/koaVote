var render = require('../lib/render');
var questions = require('./utils.js').questions;
var votes = require('./utils.js').votes;

/**
 * Show the result page
 */
module.exports.showResults = function *(qId) {
	var q = yield questions.findById(qId);
	var voteList = yield votes.find({ questionId : qId });
	this.body = yield render('results', { question : q, votes : voteList });
};