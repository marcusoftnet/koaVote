var render = require('../lib/render');

/**
 * Show the home page
 */
module.exports.showHome = function *(id) {
  this.body = yield render('home');
};