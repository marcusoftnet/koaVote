var route = require('koa-route');
var render = require('../lib/render');
var questions = require('./utils.js').questions;

module.exports = function (app) {
	app.use(route.get('/', showHome));

	function *showHome(id){
		var questionsList = yield questions.find({});
		this.body = yield render('home', { questions : questionsList });
	};
};
