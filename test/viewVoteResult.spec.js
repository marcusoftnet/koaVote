var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Viewing results for question', function(){
	var test_vote = {};
	var test_question = {};

	beforeEach(function (done) {
		co(function *(){
			test_question = yield testHelpers.questions.insert({
				tags : ['RS Bungsu','tag 1', 'tag 2', 'tag 3'],
				questionTitle : 'Question Q1?'
			});

			var today = new Date();
			var yesterday = new Date(today);
			yesterday.setDate(today.getDate()-1);

			test_vote = { voteValue : 1, created_at : today, questionId : test_question._id};

			yield [
				testHelpers.votes.insert(test_vote),
				testHelpers.votes.insert({ voteValue : 2, created_at : today, questionId : test_question._id}),
				testHelpers.votes.insert({ voteValue : 3, created_at : yesterday, questionId : test_question._id}),
				testHelpers.votes.insert({ voteValue : 4, created_at : yesterday, questionId : test_question._id})
			];

		})(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('shows results for all votes for the question for the vote... yeah, I know...', function (done) {
		co(function *(){
			var url = '/vote/' + test_vote._id + '/result';

			request
				.get(url)
				.expect('Content-Type', /html/)
				.expect(/Question Q1?/)
	      		.expect(200)
				.end(done);
		})();
	});
});