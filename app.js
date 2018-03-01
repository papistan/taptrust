require('dotenv').config();

const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Set up the express app
const app = express();

// set up CORS for development
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for Passport 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })) // session secret
app.use(passport.initialize());
app.use(passport.session()) // persistent login sessions

//For Handlebars
app.set('views', './server/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Require routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Try a different route.',
  })
);

const port = parseInt(process.env.PORT, 10) || 8000;
const server = http.createServer(app);

server.listen(port);

module.exports = app;
