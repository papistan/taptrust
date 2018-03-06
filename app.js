require('dotenv').config();

const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up the express app
const app = express();

// Set up CORS for development
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require routes into the application.
require('./server/routes')(app);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Try a different route.'
  })
);

const port = parseInt(process.env.PORT, 10) || 8000;
const server = http.createServer(app);

server.listen(port);

module.exports = app;
