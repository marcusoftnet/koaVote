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

var app = require('../app.js');
module.exports.request = require('supertest').agent(app.listen());
