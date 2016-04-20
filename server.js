var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var database = require('./config/database');

var app = express();

// view engine setup
app.set('views',path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(methodOverride());

mongoose.connect(database.url);

require('./app/route-config')(app);
require('./app/error-catching')(app);

module.exports = app;