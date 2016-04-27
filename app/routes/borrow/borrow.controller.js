'use strict';

var Book = require('../../models/book');
var Town = require('../../models/town');
var Account = require('../../models/account');
var googleBooks = require('google-books-search');
var async = require('async');

module.exports = {
    
    index: function (req, res) {
        Town.find({}, function (err, towns) {
            res.render('borrow/index', { title: 'Booken Borrow', towns: towns });    
        })
    },
    
    search: function (req, res) {
        var googleResults = [];
        Book
            .find({})
            .populate({
                path: 'owner',
                populate: { path: 'town' }
            })
            .exec(function (err, books) {
                books = books.filter(function (book) {
                    return book.owner.town._id == req.body.town 
                })
                async.forEachOf(books, function(book, index, callback) {
                    googleBooks.search(book.isbn, { field: 'isbn' }, function (err, result) {
                        if (result) {
                            result[0].book = book;
                            googleResults.push(result[0]);                        
                        }
                        callback();
                    })
                }, function (err) {
                    res.render('borrow/results', { title: 'Booken Borrow', results: googleResults })
                }) 
            })
    },
    
    add: function (req, res) {
        var bookToBorrow;
        Book.findById(req.body.bookId, function (err, book) {
            bookToBorrow = book;
            req.user.borrowing.push(bookToBorrow);
            req.user.save(function (err, user) {
                res.redirect('/account/profile');
            })
        })
    }
}