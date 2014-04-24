/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('../lib/render');
var utils = require('./utils.js');
var votes = utils.votes;
var questions = utils.questions;

/**
 * Show voting page
 */
module.exports.showAddVote = function *() {
  if(!utils.exists(this.query.questionId)){
    this.set('ErrorMessage', "No questionId passed to page");
    this.redirect('/');
    return;
  }
  var questionId = this.query.questionId;
  var question = yield questions.findOne(questionId);

  if(!utils.exists(question)){
    this.set('ErrorMessage', "No question found for id: '" + questionId + "'");
    this.redirect('/');
    return;
  }

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
  if(!utils.existsAndNonEmpty(vote.voteValue)){
    this.set('ErrorMessage', 'Vote value required');
    this.redirect(errorRedirectUrl);
    return;
  }

  // Create it
  vote.tags = utils.trimTags(vote.tagString.split(','));
  delete vote.tagString;
  vote.created_at = new Date;

  // Store it!
  var v = yield votes.insert(vote);
  this.redirect('/vote/' + v._id + '/comment');
};

/**
 * Show thank you form, and add a comment
 */
module.exports.showAddComment = function *(id) {
  var vote = yield votes.findById(id);
  this.body = yield render('comment', { voteId : id, questionId : vote.questionId });
};

/**
 * Adds a comment to vote
 */
module.exports.addComment = function *(id){
  var posted = yield parse(this);

  var vote = yield votes.findAndModify(
      {_id : id },
      { $set: {comment : posted.comment }}
  );

  this.redirect('/vote?questionId=' + vote.questionId);
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