koaVote
=======

A very simple voting site using Koa

# Backlog

## Todo
- download bootstrap locally for faster (?!) download in Indonesia
- Group result data on:
-- day
-- week
-- month
-- total
- Export the displayed results to Excel (see export route)
- Create some nice result graphs using the Google Charts
- Make sure the selected questionId is set as selected when posting back to result form


## Doing

## Done
- Export xls as a file
- Configuration moved to a file of it's own
- Write tests... Ah well... started at least
- Create a "Thanks for your response"-page with possibility to add comment
- Create question-functionality, that:
- Update question
- Update the vote page so that it get the data from mongo
- Push to Heroku
- Make sure that after adding comment you're redirected back to the question in question :)
- Home page contains list of questions/polls.
- Create a page for showing result of a question
- Create a link to the result page from the question-page
- Move the result functionality under the question, route-wise
### The model clean up
- The votes should have an array of tags, for searching - DONE
- The question should just prefill the vote-page with tags - DONE
- The hospital field should go away, and instead be a tag - DONE
- The results should NOT be /question/result, but just /result - DONE
- List votes matching criterias on the page - DONE
- Make pretty GUI-wise :P - DONE
- Basic authentication for admin - DONE
- Restructuring routes - DONE