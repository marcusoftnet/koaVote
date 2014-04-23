var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Showing result for question', function(){
	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add votes', function(done){
		co(function *(){
			var q = yield testHelpers.questions.insert({
				hospital : 'RS Bungsu',
				tags : ['tag 1', 'tag 2', 'tag 3'],
				questionTitle : 'What did you like your stay?'
			});

			request
				.get('/result/' + q._id)
				.expect('Content-Type', /html/)
				.expect(function (req) {
		  			req.text.should.containEql(q.questionTitle);
		  		})
	      		.expect(200)
				.end(done);
		})();
	});
});