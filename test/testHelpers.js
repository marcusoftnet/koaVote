var co = require('co');
var config = require('../config')('local');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes'));
module.exports.votes = votes;

module.exports.removeAllDocs = function(done){
	co(function *(){
		yield votes.remove({});
	})(done);
};

module.exports.POST_VOTE_DATA = { hospital: 'RS Bungsu', voteValue : 3, questionId : 12345678990 }

var app = require('../app.js');
module.exports.app = app;