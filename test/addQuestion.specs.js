var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding questions', function(){
	var a_test_question = {};

	beforeEach(function (done) {
		a_test_question  = {
			hospital: 'RS Bungsu',
			tagString : 'tag 1, tag 2, tag 3',
			questionTitle : 'What about this?' };

		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add new questions', function(done){
		request
			.get('/question/new')
	  		.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it('with correct values works fine', function(done){
		request
			.post('/question/new')
			.send(a_test_question)
			.expect(302)
			.expect('location', /question/) // TODO: Nice little regexp here /vote/*.*/comment
			.end(done);
	});
});