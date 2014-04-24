var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Showing results', function(){
	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to request results from', function(done){
		request
			.get('/results')
			.expect('Content-Type', /html/)
      		.expect(200)
			.end(done);
	});
});