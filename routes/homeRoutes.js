var render = require('../lib/render');
var config = require('../config')();

var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var questions = wrap(db.get('questions'));

/**
 * Show the home page
 */
module.exports.showHome = function *(id) {
	var questionsList = yield questions.find({});
	this.body = yield render('home', { questions : questionsList });
};