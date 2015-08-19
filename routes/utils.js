var config = require('../config')();

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes'));
module.exports.votes = votes;
var questions = wrap(db.get('questions'));
module.exports.questions = questions;


var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	return true;
};
module.exports.exists = exists;

module.exports.existsAndNonEmpty = function (value){
	if(!exists(value))
		return false;
	if(value === '')
		return false;
	return true;
};

module.exports.splitAndTrimTagString = function (tagString){
	var tags = tagString.split(',');
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].trim();

		// Remove empty tags
		if(tags[i].length === 0){
			tags.splice(i);
			i--;
		}
	};
	return tags;
};

module.exports.yyyymmdd_to_date = function(str) {
	// validate year as 4 digits, month as 01-12, and day as 01-31
    if ((str = str.match (/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/))) {
       // make a date
       str[0] = new Date (+str[1], +str[2] - 1, +str[3]);
       // check if month stayed the same (ie that day number is valid)
       if (str[0].getMonth () === +str[2] - 1)
          return str[0];
    }
    return undefined;
};

Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};