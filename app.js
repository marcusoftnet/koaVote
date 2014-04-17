/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var route = require('koa-route');
var serve = require('koa-static');
var koa = require('koa');
var app = module.exports = koa();
var config = require('./config')();

// middleware
app.use(logger());
app.use(serve(__dirname + '/public'));

// route middleware
var routes = require('./routes/voteRoutes.js');
app.use(route.get('/', routes.showAddVote));
app.use(route.post('/vote', routes.addVote));
app.use(route.get('/vote/:id/comment', routes.showAddComment));
app.use(route.post('/vote/:id/comment', routes.addComment));
app.use(route.get('/vote/export/:format', routes.exportTo));

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);