koaVote
=======

A very simple voting site using Koa

# Backlog

## Todo
### The model clean up
* The votes should have an array of tags, for searching - DONE
* The question should just prefill the vote-page with tags - DONE
* The hospital field should go away, and instead be a tag 
* The results should NOT be /question/result, but just /result
** optionally prefilled with tags from the question
** date span
** tags


* Move the export to Excel to the result page
* Create some nice graphs using the Google Charts
* Add filters for the result page so that it can be filtrered on
** Date span
** Tags
* Make pretty GUI-wise :P
* Add login for create new question stuff

## Done
* Export xls as a file
* Configuration moved to a file of it's own
* Write tests... Ah well... started at least
* Create a "Thanks for your response"-page with possibility to add comment
* Create question-functionality, that:
* Update question
* Update the vote page so that it get the data from mongo
* Push to Heroku
* Make sure that after adding comment you're redirected back to the question in question :)
* Home page contains list of questions/polls.
* Create a page for showing result of a question
* Create a link to the result page from the question-page
* Move the result functionality under the question, route-wise

