var testHelpers = require('./testHelpers.js');
var request = testHelpers.request;

describe('Adding questions', function(){

	it('has a page to add new questions', function(done){
		request
			.get('/')
	  		.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});
});