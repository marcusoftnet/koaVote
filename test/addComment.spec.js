var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = require('supertest').agent(testHelpers.app.listen());


describe('Adding comments', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add comments', function(done){
		co(function *(){
			var vote = yield testHelpers.votes.insert({
				hospital: 'RS Bungsu',
				voteValue : 3,
				questionId : 12345678990
			});
			request
				.get('/vote/' + vote._id + '/comment')
				.expect('Content-Type', /html/)
	      		.expect(200)
				.end(done);
		})();
	});
});