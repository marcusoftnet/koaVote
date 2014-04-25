var config = require('../config')();

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes'));
module.exports.votes = votes;
var questions = wrap(db.get('questions'));
module.exports.questions = questions;


var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	return true;
};
module.exports.exists = exists;

module.exports.existsAndNonEmpty = function (value){
	if(!exists(value))
		return false;
	if(value === '')
		return false;
	return true;
};

module.exports.splitAndTrimTagString = function (tagString){
	var tags = tagString.split(',');
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].trim();
	};
	return tags;
};