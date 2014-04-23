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

// routes
var homeRoutes = require('./routes/homeRoutes.js');
app.use(route.get('/', homeRoutes.showHome))

var voteRoutes = require('./routes/voteRoutes.js');
app.use(route.get('/vote', voteRoutes.showAddVote));
app.use(route.post('/vote', voteRoutes.addVote));
app.use(route.get('/vote/:id/comment', voteRoutes.showAddComment));
app.use(route.post('/vote/:id/comment', voteRoutes.addComment));
app.use(route.get('/vote/export/:format', voteRoutes.exportTo));

var questionRoutes = require('./routes/questionRoutes.js');
app.use(route.get('/question/new', questionRoutes.showAddQuestion));
app.use(route.post('/question/new', questionRoutes.addQuestion));

app.use(route.get('/question/:id', questionRoutes.showQuestion));
app.use(route.post('/question/:id/update', questionRoutes.updateQuestion));

var resultRoutes = require('./routes/resultRoutes.js');
app.use(route.get('/question/:questionId/results', resultRoutes.showResults));

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);