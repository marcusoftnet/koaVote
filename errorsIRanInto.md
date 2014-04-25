# TypeError: Cannot call method 'apply' of undefined
means that the method is not defined.
For example

```javascript
var routes = require('./routes/voteRoutes.js');
app.use(route.post('/vote/:id/comment', routes.addComment));
```
But voteRoutes.js doesn't have the addComment method. Or doesn't export it.

# git push heroku master -> Permission denied (publickey).
And then "fatal: Could not read from remote repository.
Please make sure you have the correct access rights"

This was because i only had github public keys. I had to regenerate the id_rsa keys. I followed these instructions to clear it up:
Navigate to the ~/.ssh directory and delete the id_rsa and id_rsa.pub if they are there. I started with new keys, though it might not be necessary.

$ cd ~/.ssh
$ rm id_rsa id_rsa.pub
Follow the steps on gitHub to generate ssh keys
Login to heroku, create a new site and add your public keys:

$ heroku login
...
$ heroku create
$ heroku keys:add
$ git push heroku master

# Heroku + node.js error (Web process failed to bind to $PORT within 60 seconds of launch)
Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there. Switch your listen to this:

.listen(process.env.PORT || 5000)

That way it'll still listen to port 5000 when you test locally, but it will also work on Heroku.
http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of

# SyntaxError: Unexpected identifier on yield
´´´javascript
function getVotesForCritera(postedCriteria){
	var votes = yield votes.find({});
	return votes;
};
´´´
´´´ bash
	var votes = yield votes.find({});
	                  ^^^^^
	SyntaxError: Unexpected identifier
´´´

This because the yield keyword is not valid in a function without a *. A asterisk denotes a generator function. Yield is only valid within a generator function.

Pretty easy fix.

´´´javascript
function *getVotesForCritera(postedCriteria){
	var votes = yield votes.find({});
	return votes;
};
´´´