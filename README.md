koaVote
=======

A very simple voting site using Koa

# Backlog

## Todo
* Move the export functionality under the question, route-wise
* Filter the export on querystring parameters (?from=20120101&to=20120131&averagePer=day/week/month for example)
* Make pretty GUI-wise :P
* Add login for create new question stuff
* Push to Heroku

## Done
* Export xls as a file
* Configuration moved to a file of it's own
* Write tests... Ah well... started at least
* Create a "Thanks for your response"-page with possibility to add comment
* Create question-functionality, that:
* Update question
* Update the vote page so that it get the data from mongo
* Make sure that after adding comment you're redirected back to the question in question :)