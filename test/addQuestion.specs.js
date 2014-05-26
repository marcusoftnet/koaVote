var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Adding questions', function(){
	var a_test_question = {};
	var NEW_QUESTION_URL = '/question/new';

	beforeEach(function (done) {
		a_test_question  = {
			tagString : 'RS Bungsu, tag 1, tag 2, tag 3',
			questionTitle : 'What about this?',
			thankYouText : 'Thank you for you vote!',
			commentTitle : 'Do you want to add a comment?' };

		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	it('has a page to add new questions', function(done){
		request
			.get(NEW_QUESTION_URL)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
	  		.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it('with correct values works fine', function(done){
		request
			.post(NEW_QUESTION_URL)
			.send(a_test_question)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(302)
			.expect('location', /question/) // TODO: Nice little regexp here /vote/*.*/comment
			.end(done);
	});

	it('requires a question title', function (done) {
		delete a_test_question.questionTitle;

		request
			.post(NEW_QUESTION_URL)
			.send(a_test_question)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(302)
			.expect('location', NEW_QUESTION_URL)
			.expect('ErrorMessage', 'Question required')
			.end(done);
	});

	it('requires a thank you note', function (done) {
		delete a_test_question.thankYouText;

		request
			.post(NEW_QUESTION_URL)
			.send(a_test_question)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(302)
			.expect('location', NEW_QUESTION_URL)
			.expect('ErrorMessage', 'Thank you note required')
			.end(done);
	});

	it('requires a comment title', function (done) {
		delete a_test_question.commentTitle;

		request
			.post(NEW_QUESTION_URL)
			.send(a_test_question)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(302)
			.expect('location', NEW_QUESTION_URL)
			.expect('ErrorMessage', 'A title for the comment box is required')
			.end(done);
	});
});