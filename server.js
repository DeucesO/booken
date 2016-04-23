var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session')

var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

var configDB = require('./config/database');
configDB.connect(app.get('env'));

require('./config/passport')(passport);

// view engine setup
app.set('views',path.join(__dirname, '/public/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(methodOverride());

app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  req.models = {};
  next();
});

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
})

require('./app/route-config')(app, passport);
require('./app/error-catching')(app);

module.exports = app;