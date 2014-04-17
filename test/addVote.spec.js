var app = require('../app.js');
var co = require('co');
var should = require('should');
var request = require('supertest').agent(app.listen());

var config = require('./config')('local');

var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes'));


describe('Adding votes', function(){
	var removeAll = function(done){
		co(function *(){
			yield votes.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);
	});

	afterEach(function (done) {
		removeAll(done);
	});

	var a_test_vote  = { hospital: 'RS Bungsu', voteValue : 3 };

	it('renders a page to add votes', function(done){
		request
			.get('/')
			.expect('Content-Type', /html/)
      		.expect(200)
			.end(done);
	});

	it('with correct values', function(done){
		request
			.post('/vote')
			.send(a_test_vote)
			.expect(302)
			.expect('location', '/')
			.end(done);
	});

	it('requires a hospital set'); // TODO: Redirect to the Edit-page instead
	it('requires a vote value');
	it('requires a question reference');
});