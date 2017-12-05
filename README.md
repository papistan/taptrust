# Taptrust API

For development:

1. Set `DATABASE_URL` to your postgres development database. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run it locally).
2. `npm install` to install dependencies.
3. Run `sequelize db:migrate`.
4. Initialize dev server with `npm run start:dev`, which starts at localhost:8000.

Then, using [Postman](https://www.getpostman.com/), you can `GET, POST, PUT, DELETE` at these routes:

POST:

* `/api/token` to create a new Token
* `/api/token/:tokenId/review` to create a new review for a coin (:tokenId is the id of the token you want to add a review of)

GET:

* `/api/token` to GET all tokens and their reviews
* `/api/token/:tokenId` to GET a specific coin, and it's reviews
* `/api/token/:tokenId/review` to GET all of a specific token's reviews
* `/api/review/:reviewId` to GET a specific review

PUT:

* `/api/token/:tokenId` to update a specific coin
* `/api/review/:reviewId` to update a specific review

DELETE:

* `/api/token/:tokenId` to delete a coin
* `/api/token/:tokenId/review/:reviewId` to delete a review

As of first commit, parameters for Token are:

* name
* category
* description
* symbol
* website
* founders

(all scores automatically entered once a review for the coin is entered)

* score_overall
* score_transparency
* score_quality
* score_friendly
* score_legal
* score_usability

NOTE: Token's score attributes are supposed to update each time a new review is created as the average. Currently, each attribute updates with the scores of the latest reviews. Code to fix this is in progress.

Parameters for Review are:

* name
* review
* score_overall (entered automatically)
* score_transparency
* score_quality
* score_friendly
* score_legal
* score_usability

NOTE: score_overall is an average of the other scores. This is working as of first commit.


Front-end currently in development.