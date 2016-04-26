'use strict';

var googleBooks = require('google-books-search');
var Book = require('../../models/book');
var Account = require('../../models/account');

module.exports = {
    
    index: function (req, res) {
        res.render('lend/index', { title: 'Booken Lend' });
    },
    
    search: function (req, res, next) {
        var books = googleBooks.search(req.body.isbn, { field: 'isbn' }, function (err, results) {
            if (err) {
                next(err);
            }
            else {
                res.render('lend/results', { results: results })
            }
        });
    },
    
    add: function (req, res) {
        var bookToLend = new Book({ 
            isbn: req.body.isbn, 
            owner: req.user._id 
        });
        bookToLend.save(function (err, book) {
            Account.findById(req.user._id, function (err, user) {
                user.lending.push(book);
                user.save(function (err) {
                    res.redirect('/account/profile');
                });
            });
        });
    }
}