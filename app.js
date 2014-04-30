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
var homeRoutes = require('./routes/homeRoutes.js')(app);
var voteRoutes = require('./routes/voteRoutes.js')(app);
var questionRoutes = require('./routes/questionRoutes.js')(app);
var resultRoutes = require('./routes/resultRoutes.js')(app);

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);