var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var serve = require('koa-static');
var mount = require('koa-mount');
var auth = require('koa-basic-auth');
var config = require('./config')();

var app = module.exports = koa();

// middleware
//app.use(logger());
app.use(serve(__dirname + '/public'));

// Security
app.use(function *(next){
  try {
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
var user = { name: 'tobi', pass: 'ferret' };
app.use(mount('/results', auth(user)));
app.use(mount('/question', auth(user)));

// routes
require('./routes/homeRoutes.js')(app);
require('./routes/voteRoutes.js')(app);
require('./routes/questionRoutes.js')(app);
require('./routes/resultRoutes.js')(app);

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);