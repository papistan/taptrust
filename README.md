# Taptrust API


## Getting Started
#### Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone git@github.com:taptrust/taptrust.git # or clone your own fork
$ cd taptrust
```

1. Set `DATABASE_URL` environment variable to your postgres development database. You can do that from the command line with `export DATABASE_URL={DATABASE_URL}`. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run it locally).
2. `npm install` to install dependencies.
3. Run `sequelize db:migrate`.
4. Initialize dev server with `npm run start:dev`, which starts at localhost:8000.
5. The frontend is in the `view` folder. `cd view` and run `npm install` and `npm start`. (Frontend has it's own package.json.). The frontend server runs on `localhost:8080`

#### Post first token/review

* With database server and frontend server running, you can POST your first token at `localhost:8080/tokenform`. 
* After a token is posted you can POST your first review at `localhost:8080/reviewform/:tokenId`, where tokenId is the id of the token that you want to review.

#### API 
In addition, you can `GET, POST, PUT, DELETE` at these routes:

POST:

* `/api/tokens` to create a new token. Response will be `201 Created` for success or `400 Bad Request` for error.
* `/api/tokens/:tokenId/reviews` to create a new review for a token (:tokenId is the id of the token you want to add a review of). This request will also update the aggregate scores of the token, which are the average of each score category. Response will be `201 Created` for success or `400 Bad Request` for error.

GET:

* `/api/tokens` to GET all tokens and their reviews. Response will be `200 OK` for success or `400 Bad Request` for error.
* `/api/tokens/:name` to GET a specific coin, and it's reviews. Response will be `200 OK` for success, `404 Token not found`, or `400 Bad Request` for error.
* `/api/tokens/:tokenId/review` to GET all of a specific token's reviews. Response will be `200 OK` for success or `400 Bad Request` for error.
* `/api/reviews/:reviewId` to GET a specific review. Response will be `200 OK` for success or `400 Bad Request` for error.

PUT:

* `/api/tokens/:tokenId` to update a specific coin. Response will be `200 OK` for success or `400 Bad Request` for error.
* `/api/reviews/:reviewId` to update a specific review. Response will be `200 OK` for success or `400 Bad Request` for error.

DELETE:

* `/api/tokens/:tokenId` to delete a token. Response will be `204 No Content` for success or `400 Bad Request` for error.
* `/api/tokens/:tokenId/reviews/:reviewId` to delete a review. Response will be `204 No Content` for success or `400 Bad Request` for error.

#### Tokens:

| Field Names   			| Field Type    | Description      |
| -------------				|-------------| -----------------	|
| id     					| *Integer* 	| Automatically generated id for a given token	|
| name     					| *String* 		| The name of the token 	       |
| category     				| *String*      | A token's given category (Utilities, Social, General, ect).|
| description 				| *Text*     	| A longer description of the token and it's unique qualities.|
| age           			| *String*		| The age of the token since it's creation (In years, months).|
| symbol					| *String*		| The token's abbreviated symbol, eg. ETH or LTC. |
| website					| *String*		| The website of the token, leaving off 'http://' (eg. taptrust.com).|
| founders					| *String*		| A single founder, or a single string of founders separated by commas.|
| score_overall     		| *Integer* 	| The average of all of a token's score_overall reviews. **Entered automatically**|
| score_transparency     	| *Integer*     | The average of all of a token's score_transparency reviews. **Entered automatically**|
| score_governance 			| *Integer*     | The average of all of a token's score_governance reviews. **Entered automatically**|
| score_legal          		| *Integer*		| The average of all of a token's score_legal reviews. **Entered automatically**|
| score_functionality		| *Integer*		| The average of all of a token's score_functionality reviews. **Entered automatically**|
| createdAt    				| *Date* 		| Automatically generated datetime that the token was created 	|
| updatedAt    				| *Date* 		| Automatically generated datetime that the token was last updated 	|


The above fields should be sent in POST/PUT requests using *x-www-form-urlencoded params*.

**All token score fields will be automatically entered once a review for the coin is POSTed. They will be `null` until then.**

#### Reviews:

| Field Names   		| Field Type    | Description      |
| -------------			|-------------| -----------------	|
| id     					| *Integer* 	| Automatically generated id for a given review	|
| tokenId     				| *Integer* 	| id of the token to which this review corresponds. Generated from URL during POST request	|
| name     				| *String* 		| The name of the person leaving a review.	       |
| review     			| *Text*      	| A longer format review of a given token, minimum 100 characters.|
| url 					| *String*     	| Url for a website of the reviewer. (Personal website, Medium, Twitter, ect)|
| score_overall     	| *Integer*		| Average of all other scores. **Automatically entered after other scores are entered**|
| score_transparency	| *Integer*		| A score for a given token based on it's transparency, 0-100. |
| score_legal			| *Integer*		| A score for a given token based on it's legal status, 0-100. |
| score_functionality	| *Integer*		| A score for a given token based on it's functionality, 0-100.| 
| score_governance		| *Integer*		| A score for a given token based on it's governance, 0-100.   | 
| createdAt    				| *Date* 		| Automatically generated datetime that the review was created 	|
| updatedAt    				| *Date* 		| Automatically generated datetime that the review was last updated 	|
