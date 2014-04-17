# TypeError: Cannot call method 'apply' of undefined 
means that the method is not defined. 
For example

var routes = require('./routes/voteRoutes.js');
app.use(route.post('/vote/:id/comment', routes.addComment));

But voteRoutes.js doesn't have the addComment method. Or doesn't export it. 


