'use strict';

var passport = require('passport');
var Account = require('../../models/account');
var Town = require('../../models/town');
var googleBooks = require('google-books-search');
var async = require('async');

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
        Account.register(new Account({ username: req.body.username, town: req.body.town }), req.body.password, function (err, account) {
            if (err) {
                return res.redirect('/account/register');
            }
            
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            })
        })
    },
    
    profile: function(req, res) {
        var googleResultsLending = [];
        var googleResultsBorrowing = [];
        Account
            .findOne({ _id: req.user._id })
            .populate('lending borrowing')
            .exec(function (err, user) {
                async.forEachOf(user.lending, function(book, index, callback) {
                    googleBooks.search(book.isbn, { field: 'isbn' }, function (err, result) {
                        if (result) {
                            googleResultsLending.push(result[0]);                            
                        }
                        callback();
                    })
                }, function (err) {
                    async.forEachOf(user.borrowing, function (book, index, callback) {
                        googleBooks.search(book.isbn, { field: 'isbn' }, function (err, result) {
                            if (result) {
                                googleResultsBorrowing.push(result[0]);
                            }
                            callback();
                        })
                    }, function (err) {
                        res.render('account/profile', { title: 'Booken Profile', booksLending: googleResultsLending, booksBorrowing: googleResultsBorrowing })                        
                    })
                }) 
            })
    }
}