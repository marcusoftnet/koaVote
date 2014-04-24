var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding comments', function(){
	var a_test_vote = {};

	beforeEach(function (done) {
		a_test_vote = {
				tags: ['RS Bungsu', 'tag 1'],
				voteValue : 3,
				questionId : 12345678990
			};

		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add comments', function(done){
		co(function *(){
			var vote = yield testHelpers.votes.insert(a_test_vote);

			request
				.get('/vote/' + vote._id + '/comment')
				.expect('Content-Type', /html/)
	      		.expect(200)
				.end(done);
		})();
	});

	it('adds a comment to a existing vote', function (done) {
		co(function *(){
			var vote = yield testHelpers.votes.insert(a_test_vote);

			request
				.post('/vote/' + vote._id + '/comment')
				.send({comment: 'A nice little comment'})
	      		.expect(302)
	      		.expect('location', '/vote?questionId='+vote.questionId)
				.end(done);
		})();
	});
});