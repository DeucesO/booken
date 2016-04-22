'use strict';

var passport = require('passport');
var Account = require('../../models/account');
var Town = require('../../models/town');

module.exports = {
    
    getLogin: function (req, res) {
        res.render('account/login', { title: 'Booken Login' });
    },
    
    login: function (req, res) {
        res.redirect('/');
    },
    
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    
    getRegister: function (req, res) {
        Town.find({}, function (err, towns) {
            res.render('account/register', { title: 'Booken Register', towns: towns });            
        })
    },
    
    register: function (req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
                return res.render('account/register', { account: account });
            }
            
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            })
        })
    }
}