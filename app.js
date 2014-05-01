var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var serve = require('koa-static');
var mount = require('koa-mount');
var auth = require('koa-basic-auth');
var config = require('./config')();
var userAuth = require('./lib/authentication.js');

var app = module.exports = koa();

// middleware
//app.use(logger());
app.use(serve(__dirname + '/public'));

// Security
app.use(userAuth.reqBasic);
app.use(mount('/results', auth(userAuth.user)));
app.use(mount('/question', auth(userAuth.user)));

// routes
require('./routes/homeRoutes.js')(app);
require('./routes/voteRoutes.js')(app);
require('./routes/questionRoutes.js')(app);
require('./routes/resultRoutes.js')(app);

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);