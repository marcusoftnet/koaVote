/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('../lib/render');
var utils = require('./utils.js');
var config = require('../config')();

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongoUrl);
var votes = wrap(db.get('votes')); // TODO: Move to utils
var questions = wrap(db.get('questions'));

/**
 * Show voting page
 */
module.exports.showAddVote = function *() {
  var questionId = this.query.questionId;
  console.log(questionId);
  var question = yield questions.findOne(questionId);

  question.tagString = question.tags.join(',');
  question.id = question._id.toString();

  this.body = yield render('newVote', { question : question });
};

/**
 * Store a vote.
 */
module.exports.addVote = function *() {
  var vote = yield parse(this);

  // Validate
  var errorRedirectUrl = '/vote?questionId=' + vote.questionId;
  if(!utils.existsAndNonEmpty(vote.questionId)){
    this.set('ErrorMessage', 'QuestionId required');
    this.redirect(errorRedirectUrl);
    return;
  }
  if(!utils.existsAndNonEmpty(vote.hospital)){
    this.set('ErrorMessage', 'Hospital required');
    this.redirect(errorRedirectUrl);
    return;
  }
  if(!utils.existsAndNonEmpty(vote.voteValue)){
    this.set('ErrorMessage', 'Vote value required');
    this.redirect(errorRedirectUrl);
    return;
  }

  // Store it!
  vote.created_at = new Date;
  var v = yield votes.insert(vote);
  this.redirect('/vote/' + v._id + '/comment');
};

/**
 * Show thank you form, and add a comment
 */
module.exports.showAddComment = function *(id) {
  this.body = yield render('comment', { voteId : id });
};

/**
 * Adds a comment to vote
 */
module.exports.addComment = function *(id){
  var posted = yield parse(this);

  var vote = yield votes.findById(id); // TODO: This should be able to do in one go.
  vote.comment = posted.comment;
  yield votes.updateById(id, vote);

  this.redirect('/');
};

/**
 * Export data
 * TODO: Move to own file?
 */
module.exports.exportTo = function *list(format) {
  var voteList = yield votes.find({});

  if (format === 'xls') {
    this.set('Content-Disposition', 'attachment;filename=data.xls');
    this.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    this.body = yield render('list', { votes: voteList });
    return;
  }

  // default to json
  this.type = 'json';
  this.body = voteList;
};