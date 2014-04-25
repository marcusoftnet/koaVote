var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Showing results', function(){
	var resultPostData = {};
	beforeEach(function (done) {
		resultPostData = {
			questionId : '111',
			tagString : 'tag 1, tag 2, tag 3',
			from : '2014-01-01',
			to : '2020-01-01'
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

	it('filters the results on question', function (done) {
		co(function *(){
			var res = yield [
				testHelpers.votes.insert({ voteValue : 2, questionId : 111}),
				testHelpers.votes.insert({ voteValue : 3, questionId : 111}),
				testHelpers.votes.insert({ voteValue : 4, questionId : 222}),
				testHelpers.votes.insert({ voteValue : 1, questionId : 111})
			];

			request
				.post('/results')
				.send(resultPostData)
				.expect(200)
		  		// .expect(function (res) {
		  		// 	console.log(res.text);
		  		// 	res.text.should.containEql('<li>2</li>');
		  		// 	res.text.should.containEql('<li>3</li>');
		  		// 	res.text.should.containEql('<li>4</li>');
		  		// })
				.end(done);
		})();
	});
	it('filters the results on tags');
	it('filters the results on to and from dates');
});