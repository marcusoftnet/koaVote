var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Updating questions', function(){
	var a_test_question = {};

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

	it('has a page to update questions', function(done){
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			request
				.get('/question/' + question._id.toString())
				.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
				.expect('Content-Type', /html/)
	      		.expect(200)
				.end(done);
		})();
	});

	it('updates question with all required values', function(done){
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				questionTitle : '111 - How about now?',
				tagString : '111 - RS Bungsu, tag 111-1, tag 111-2',
				thankYouText : 'Thank you for you vote!',
				commentTitle : 'Do you want to add a comment?'
			};

			request
				.post('/question/' + question._id + '/update')
				.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
				.send(updatedQuestion)
	      		.expect(302)
	      		.expect('location', '/question/' + question._id)
				.end(done);
		})();
	});

	it('requires a question title', function (done) {
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				thankYouText : 'Thank you for you vote!',
				commentTitle : 'Do you want to add a comment?'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
				.expect(302)
				.expect('location', '/question/' + question._id)
				.expect('ErrorMessage', 'Question required')
				.end(done);
		})();
	});

	it('requires a thank you note', function (done) {
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				questionTitle : '111 - How about now?',
				commentTitle : 'Do you want to add a comment?'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
				.expect('ErrorMessage', 'Thank you note required')
				.expect(302)
				.expect('location', '/question/' + question._id)
				.end(done);
		})();
	});

	it('requires a comment title', function (done) {
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				questionTitle : 'What about this?',
				thankYouText : 'Thank you for you vote!',
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
				.expect('ErrorMessage', 'A title for the comment box is required')
				.expect(302)
				.expect('location', '/question/' + question._id)
				.end(done);
		})();
	});
});