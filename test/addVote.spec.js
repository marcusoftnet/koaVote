var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding votes', function(){
	var a_test_vote = {};
	beforeEach(function (done) {
		a_test_vote  = { hospital: 'RS Bungsu', voteValue : 3 }
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});


	it('has a page to add votes', function(done){
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