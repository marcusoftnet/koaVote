var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Showing results', function(){
	var resultPostData = {};
	beforeEach(function (done) {
		resultPostData = {
			questionId : '',
			tagString : '',
			from : '',
			to : ''
		};
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to request results from', function(done){
		co(function *(){
			var q = yield testHelpers.questions.insert({
				tags : ['RS Bungsu','tag 1', 'tag 2', 'tag 3'],
				questionTitle : 'Question Q1?'
			});

			var q2 = yield testHelpers.questions.insert({
				tags : ['RS Bungsu', 'tag 1', 'tag 2', 'tag 3'],
				questionTitle : 'Question Q2?'
			});

			request
				.get('/results')
		  		.expect(function (req) {
		  			req.text.should.containEql('Question Q1?');
		  			req.text.should.containEql('Question Q2?');
		  		})
				.end(done);
		})();
	});

	it('filters the results by questionid', function (done) {
		co(function *(){
			yield [
				testHelpers.votes.insert({ voteValue : 1, questionId : 111}),
				testHelpers.votes.insert({ voteValue : 2, questionId : 111}),
				testHelpers.votes.insert({ voteValue : 3, questionId : 111}),
				testHelpers.votes.insert({ voteValue : 4, questionId : 222})
			];

			resultPostData.questionId = 111;

			request
				.post('/results')
				.send(resultPostData)
				.expect(200)
		  		.expect(function (res) {
		  			res.text.should.containEql('<li>1</li>');
		  			res.text.should.containEql('<li>2</li>');
		  			res.text.should.containEql('<li>3</li>');
		  		})
				.end(done);
		})();
	});
	it('filters the results on one tag', function (done) {
		co(function *(){
			yield [
				testHelpers.votes.insert({ voteValue : 1, tags : ['tag 1', 'tag 2'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 2, tags : ['tag 2'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 3, tags : ['tag 2', 'tag 1'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 4, tags : ['tag 3', 'tag 4'], questionId : 111})
			];

			resultPostData.tagString = 'tag 2';

			request
				.post('/results')
				.send(resultPostData)
				.expect(200)
		  		.expect(function (res) {
		  			res.text.should.containEql('<li>1</li>');
		  			res.text.should.containEql('<li>2</li>');
		  			res.text.should.containEql('<li>3</li>');
		  		})
				.end(done);
		})();
	});
	it('filters the results on several tags', function (done) {
		co(function *(){
			yield [
				testHelpers.votes.insert({ voteValue : 1, tags : ['tag 1'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 2, tags : ['tag 2'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 3, tags : ['tag 2', 'tag 1'], questionId : 111}),
				testHelpers.votes.insert({ voteValue : 4, tags : ['tag 3', 'tag 4'], questionId : 111})
			];

			resultPostData.tagString = 'tag 1, tag 2';

			request
				.post('/results')
				.send(resultPostData)
				.expect(200)
		  		.expect(function (res) {
		  			res.text.should.containEql('<li>1</li>');
		  			res.text.should.containEql('<li>2</li>');
		  			res.text.should.containEql('<li>3</li>');
		  		})
				.end(done);
		})();
	});
	it('filters the results on to and from dates');
});