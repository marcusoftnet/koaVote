var co = require('co');
var monk = require('monk');
var wrap = require('co-monk');

var config = require('../config')('local');
var db = monk(config.mongoUrl);

var votes = wrap(db.get('votes'));
module.exports.votes = votes;

var questions = wrap(db.get('questions'));
module.exports.questions = questions;

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield votes.remove({});
		yield questions.remove({});
	})(done);
};

module.exports.addDaysToDate = function (date, daysToAdd) {
	return new Date(date.getDate() + 1);
};

var app = require('../app.js');
module.exports.request = require('supertest').agent(app.listen());
