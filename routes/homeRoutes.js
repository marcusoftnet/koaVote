var render = require('../lib/render');
var questions = require('./utils.js').questions;

/**
 * Show the home page
 */
module.exports.showHome = function *(id) {
	var questionsList = yield questions.find({});
	this.body = yield render('home', { questions : questionsList });
};