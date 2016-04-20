'use strict';

var LocalStrategy = require('passport-local').Strategy;
var Account = require('../app/models/account');

module.exports = function(passport) {

    passport.use(Account.createStrategy());
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
}