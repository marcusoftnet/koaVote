var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var app = require('../app.js');
var request = require('supertest').agent(app.listen());

describe('The home page', function(){

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});


	it('displays nicely without errors', function(done){
		request
			.get('/')
	  		.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it('has a list of all the questions in the system', function(done){
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
				.get('/')
		  		.expect(function (req) {
		  			req.text.should.containEql("Question Q1?");
		  			req.text.should.containEql("Question Q2?");
		  		})
				.end(done);
		})();
	});
});