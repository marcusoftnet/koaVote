var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Updating questions', function(){
	var a_test_question = {};
	var user = {};

	beforeEach(function (done) {
		a_test_question = {
				questionTitle : 'How about now?',
				tags : ['RS Bungsu', 'tag 1', 'tag 2']
			};

		user = testHelpers.testUser;

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
				.auth(user.name, user.pass)
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
				tagString : '111 - RS Bungsu, tag 111-1, tag 111-2'
			};

			request
				.post('/question/' + question._id + '/update')
				.auth(user.name, user.pass)
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
				tagString : 'tag 111-1, tag 111-2'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.auth(user.name, user.pass)
				.expect(302)
				.expect('location', '/question/' + question._id)
				.expect('ErrorMessage', 'Question required')
				.end(done);
		})();
	});
});