var parse = require('co-body');
var render = require('../lib/render');
var utils = require('./utils.js');
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
	postedData.tags = utils.splitAndTrimTagString(postedData.tagString);

	var vm = yield recreateResultVmFromPostedData(postedData);
	vm.resultVotes = yield getVotesForCritera(postedData);

	this.body = yield render('results', { vm : vm });
};

function *getVotesForCritera(postedCriteria){
	// create mongo-filter object
	var filter = { };
	if(postedCriteria.questionId != ''){
		filter.questionId = postedCriteria.questionId;
	}

	if(postedCriteria.tags.length > 0){
		filter.tags = { $in : postedCriteria.tags};
	}

	// TODO: When connection is back
	// - between from and to
	// - votes with tags

	// Do search
	console.dir(filter);
	return yield votes.find(filter);
};

function *recreateResultVmFromPostedData (postedData) {
	return {
		to : postedData.to,
		from : postedData.from,
		selectedQuestionId : postedData.questionId,
		tagString : postedData.tagString,
		questions : yield questions.find({})
	};
}

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