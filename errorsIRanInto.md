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