var parse = require('co-body');
var render = require('../lib/render');
var questions = require('./utils.js').questions;
var votes = require('./utils.js').votes;

/**
 * Show the result page
 */
module.exports.showResultsPage = function *() {
	var vm = {
		 to : getToDefault(),
		 from : getFromDefault(),
		questions : yield questions.find({})
	};
	this.body = yield render('results', { vm : vm });
};

/**
 * Display the results for the filter criterias
 */
module.exports.getResults = function *() {
	var postedData = yield parse(this);
	this.body = yield render('results', {votes : voteList});
};

function getVotesForCritera(postedCriteria){

};

function getToDefault(){
	var now = new Date;
	return dateToYYMMDD(now);
}
function getFromDefault(){
	var now = new Date;
	var from = new Date(now.setMonth(now.getMonth()-1));
	return dateToYYMMDD(from);
}

function dateToYYMMDD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}