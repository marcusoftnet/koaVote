var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding new questions', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add comments', function(done){
		request
			.get('/question/new')
	  		.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});
});