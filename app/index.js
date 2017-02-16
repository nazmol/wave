const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

const users = require('./routes/user');
const config = require('../config').server;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/users', users);

app.get('/', (req, res) => {
  res.write(JSON.stringify({hello: 'world'}))
  res.end()
});

module.exports = app;