/**
 * Module dependencies.
 */
var parse = require('co-body');
var render = require('./lib/render');

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaVote'); // TODO: Config
var votes = wrap(db.get('votes'));

// Route definitions
/**
 * Show creation form.
 */
module.exports.add = function *add() {
  this.body = yield render('new');
};


/**
 * Store a vote.
 */
module.exports.create = function *create() {
  var vote = yield parse(this);
  vote.created_at = new Date;

  yield votes.insert(vote);
  this.redirect('/');
};

/**
 * Post listing.
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