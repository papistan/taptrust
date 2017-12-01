#Taptrust API

For development:

1. Set `DATABASE_URL` to your postgres development database. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run it locally).
2. `npm install` to install dependencies.
3. Run `sequelize db:migrate`.
4. Initialize dev server with `npm run start:dev`, which starts at localhost:8000.

Then, using [Postman](https://www.getpostman.com/), you can `GET, POST, PUT, DELETE` at these routes:

POST:

`/api/coins` to create a new Coin
`/api/coins/:coinsId/reviews` to create a new review for a coin (:coinsId is the id of the coin you want to add a review of)

GET:

`/api/coins` to GET all coins, and their reviews
`/api/coins/:coinsId` to GET a specific coin, and it's reviews
`/api/coins/:coinsId/reviews` to GET all of a specific coins reviews
`/api/reviews/:reviewsId` to GET a specific review

PUT:

`/api/coins/:coinsId` to update a specific coin
`/api/reviews/:reviewsId` to update a specific review

DELETE:

`/api/coins/:coinsId` to delete a coin
`/api/coins/:coinsId/reviews/:reviewsId` to delete a review

As of first commit, parameters for Coins are:

-name
-category
-description
-symbol
-website
-founders

(all automatically entered once a review for the coin is entered)
-score_overall
-score_transparency
-score_quality
-score_friendly
-score_legal
-score_usability

NOTE: Coins' score attributes are supposed to update each time a new review is created as the average. Currently, each attribute updates with the scores of the latest reviews. Code to fix this is in progress.

Parameters for Reviews are:

-name
-review
-score_overall (entered automatically)
-score_transparency
-score_quality
-score_friendly
-score_legal
-score_usability

NOTE: score_overall is an average of the other scores. This is working as of first commit.


Front-end currently in development.