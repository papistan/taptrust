# Taptrust API

## Getting Started

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone git@github.com:taptrust/taptrust.git # or clone your own fork
$ cd taptrust
```

#### Running Backend Server

The backend server uses Node.js, Express and PostgreSQL.

1. Copy `.env.exmaple` file to `.env` and add environment variables. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run database locally).
2. `npm install` to install dependencies.
3. Run `npm run migrate` to migrate database.
4. Initialize dev server with `npm run start:dev`, which starts at localhost:8000.

#### Running Frontend Server

The frontend server uses React, webpack, and Node.js.

1. The frontend is in the `www` folder. In this folder, copy `.env.exmaple` file to `.env` and add environment variables. You can set `API_BASE_URL` to a remote server if you'd like to develop the frontend without making any backend changes. 
2. `npm install`
3. Run`npm start`. (Frontend has it's own package.json.). The frontend server runs on `localhost:8080`.

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

| Field Names         | Field Type | Description                                                                            |
| ------------------- | ---------- | -------------------------------------------------------------------------------------- |
| id                  | _Integer_  | Automatically generated id for a given token                                           |
| name                | _String_   | The name of the token                                                                  |
| category            | _String_   | A token's given category (Utilities, Social, General, ect).                            |
| description         | _Text_     | A longer description of the token and it's unique qualities.                           |
| age                 | _String_   | The age of the token since it's creation (In years, months).                           |
| symbol              | _String_   | The token's abbreviated symbol, eg. ETH or LTC.                                        |
| website             | _String_   | The website of the token, leaving off 'http://' (eg. taptrust.com).                    |
| founders            | _String_   | A single founder, or a single string of founders separated by commas.                  |
| score_overall       | _Integer_  | The average of all of a token's score_overall reviews. **Entered automatically**       |
| score_transparency  | _Integer_  | The average of all of a token's score_transparency reviews. **Entered automatically**  |
| score_governance    | _Integer_  | The average of all of a token's score_governance reviews. **Entered automatically**    |
| score_legal         | _Integer_  | The average of all of a token's score_legal reviews. **Entered automatically**         |
| score_functionality | _Integer_  | The average of all of a token's score_functionality reviews. **Entered automatically** |
| createdAt           | _Date_     | Automatically generated datetime that the token was created                            |
| updatedAt           | _Date_     | Automatically generated datetime that the token was last updated                       |

The above fields should be sent in POST/PUT requests using _x-www-form-urlencoded params_.

**All token score fields will be automatically entered once a review for the coin is POSTed. They will be `null` until then.**

#### Reviews:

| Field Names         | Field Type | Description                                                                              |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| id                  | _Integer_  | Automatically generated id for a given review                                            |
| tokenId             | _Integer_  | id of the token to which this review corresponds. Generated from URL during POST request |
| name                | _String_   | The name of the person leaving a review.                                                 |
| review              | _Text_     | A longer format review of a given token, minimum 100 characters.                         |
| url                 | _String_   | Url for a website of the reviewer. (Personal website, Medium, Twitter, ect)              |
| score_overall       | _Integer_  | Average of all other scores. **Automatically entered after other scores are entered**    |
| score_transparency  | _Integer_  | A score for a given token based on it's transparency, 0-100.                             |
| score_legal         | _Integer_  | A score for a given token based on it's legal status, 0-100.                             |
| score_functionality | _Integer_  | A score for a given token based on it's functionality, 0-100.                            |
| score_governance    | _Integer_  | A score for a given token based on it's governance, 0-100.                               |
| createdAt           | _Date_     | Automatically generated datetime that the review was created                             |
| updatedAt           | _Date_     | Automatically generated datetime that the review was last updated                        |

### Testing:

1. Set `NODE_ENV` variable to `test` and `TEST_DB_URL` variable to your postgres test database in `.env` file. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run it locally).
2. Run `sequelize db:migrate --env test` to set up a replica of your development database on the test database.
3. Run `npm test`.

### Deploying:

### Updating the deployment:

1. Push the updated code to `master` branch.

```sh
$ git push origin master
```

2. Connect to the server via SSH.

You can connect on GCP console

3. Go to the project folder.

```
$ cd /var/www/taptrust
```

4. Pull the latest `master` branch.

```sh
$ git pull origin master
```

5. Install npm packages in backend app.

```sh
$ npm install
```

6. Install npm package in frontend app.

```sh
$ cd www
$ npm install
```

7. Build the front-end app

```sh
$ npm run build
```

8. Restart pm2 processes

```sh
$ cd ..
$ pm2 stop pm2config.json
$ pm2 start pm2config.json
```
