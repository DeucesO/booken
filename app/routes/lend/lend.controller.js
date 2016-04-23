'use strict';

var googleBooks = require('google-books-search');
var Book = require('../../models/book');

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
        var bookToLend = new Book({ isbn: isbn, owner: req.user._id })
        bookToLend.save(function (err) {
            res.redirect('/');
        });
    }
}