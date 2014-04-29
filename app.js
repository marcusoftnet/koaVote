/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var route = require('koa-route');
var serve = require('koa-static');
var auth = require('koa-basic-auth');
var koa = require('koa');
var app = module.exports = koa();
var config = require('./config')();

// middleware
app.use(logger());
app.use(serve(__dirname + '/public'));

app.use(function *(next){
  try {
  	// if(!this.req.url.startsWith('/question')){
  	// 	return;
   //  }
    	yield next;
    
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.set('WWW-Authenticate', 'Basic');
      this.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

app.use(auth({ name: 'marcus', pass: 'tobi' }));

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
app.use(route.get('/results', resultRoutes.showResultsPage));
app.use(route.post('/results', resultRoutes.getResults));

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);



if ( typeof String.prototype.startsWith != 'function' ) {
  String.prototype.startsWith = function( str ) {
    return str.length > 0 && this.substring( 0, str.length ) === str;
  }
};