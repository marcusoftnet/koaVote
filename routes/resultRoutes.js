var render = require('../lib/render');
var questions = require('./utils.js').questions;

/**
 * Show the export page
 */
module.exports.showResults = function *(questionId) {
	var q = yield questions.findById(questionId);
	this.body = yield render('results', { question : q });
};