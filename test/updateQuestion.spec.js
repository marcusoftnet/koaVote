var testHelpers = require('./testHelpers.js');
var co = require('co');
var should = require('should');
var request = testHelpers.request;

describe('Updating questions', function(){
	var a_test_question = {};
	beforeEach(function (done) {
		a_test_question = {
				hospital: 'RS Bungsu',
				questionTitle : 'How about now?',
				tags : ['tag 1', 'tag 2']
			};
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
				.expect('Content-Type', /html/)
	      		.expect(200)
				.end(done);
		})();
	});

	it('updates question with all required values', function(done){
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				hospital: '111 - RS Bungsu',
				questionTitle : '111 - How about now?',
				tagString : 'tag 111-1, tag 111-2'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
	      		.expect(302)
	      		.expect('location', '/question/' + question._id)
				.end(done);
		})();
	});

	it('requires a title', function (done) {
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				questionTitle : '111 - How about now?',
				tagString : 'tag 111-1, tag 111-2'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.expect(302)
				.expect('location', '/question/' + question._id)
				.expect('ErrorMessage', 'Hospital required')
				.end(done);
		})();
	});

	it('requires a question', function (done) {
		co(function *(){
			var question = yield testHelpers.questions.insert(a_test_question);

			var updatedQuestion = {
				hospital: '111 - RS Bungsu',
				tagString : 'tag 111-1, tag 111-2'
			};

			request
				.post('/question/' + question._id + '/update')
				.send(updatedQuestion)
				.expect(302)
				.expect('location', '/question/' + question._id)
				.expect('ErrorMessage', 'Question required')
				.end(done);
		})();
	});
});