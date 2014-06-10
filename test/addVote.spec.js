var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding votes', function(){
	var a_test_vote = {};
	beforeEach(function (done) {
		a_test_vote  = {
			voteValue : 3,
			questionId : 1234567,
			tagString : 'RS Bungsu, tag 1, one with spaces, and another'
		};
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add votes', function(done){
		co(function *(){
			var q = yield testHelpers.questions.insert({
				tags : ['RS Bungsu', 'tag 1', 'tag 2', 'tag 3'],
				questionTitle : 'What did you like your stay?'
			});

			request
				.get('/vote?questionId='+q._id)
				.expect('Content-Type', /html/)
	      		.expect(200)
				.end(done);
		})();
	});

	it('returns error when no question can be found', function(done){
		request
			.get('/vote?questionId=12345')
			.expect(302)
			.expect('location', '/')
			.expect('ErrorMessage', "No question found for id: '12345'")
			.end(done);
	});

	it('returns error when no questionId is passed to the page', function (done) {
		request
			.get('/vote')
			.expect(302)
			.expect('location', '/')
			.expect('ErrorMessage', 'No questionId passed to page')
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

	it('requires a vote value', function (done) {
		delete a_test_vote.voteValue;
		request
			.post('/vote')
			.send(a_test_vote)
			.expect(302)
			.expect('location', '/vote?questionId=1234567')
			.expect('ErrorMessage', 'Vote value required')
			.end(done);
	});
	it('requires a question reference (this is a really weird case btw)', function (done) {
		delete a_test_vote.questionId;
		request
			.post('/vote')
			.send(a_test_vote)
			.expect(302)
			.expect('location', '/vote?questionId=undefined')
			.expect('ErrorMessage', 'QuestionId required')
			.end(done);
	});
});