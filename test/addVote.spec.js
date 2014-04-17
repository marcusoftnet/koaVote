var app = require('../app.js');
var co = require('co');
var should = require('should');
var request = require('supertest').agent(app.listen());

var config = require('../config')('local');

var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes'));


describe('Adding votes', function(){
	var a_test_vote;

	var removeAll = function(done){
		co(function *(){
			yield votes.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);

		a_test_vote  = { hospital: 'RS Bungsu', voteValue : 3 }
	});

	afterEach(function (done) {
		removeAll(done);
	});


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
			.expect('location', /vote/) // TODO: Nice little regexp here /vote/*.*/comment
			.expect('location', /comment/)
			.end(done);
	});

	it('requires a hospital set', function (done) {
		delete a_test_vote.hospital;
		request
			.post('/vote')
			.send(a_test_vote)
			.expect(302)
			.expect('location', '/')
			.expect('ErrorMessage', 'Hospital required')
			.end(done);
	});
	it('requires a vote value', function (done) {
		delete a_test_vote.voteValue;
		request
			.post('/vote')
			.send(a_test_vote)
			.expect(302)
			.expect('location', '/')
			.expect('ErrorMessage', 'Vote value required')
			.end(done);
	});
	it('requires a question reference');
});