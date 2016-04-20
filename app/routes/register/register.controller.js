'use strict';

var passport = require('passport');
var Account = require('../../models/account');

module.exports = {
    
    index: function (req, res) {
        res.render('register/index', { title: 'Booken Register' });
    },
    
    register: function (req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
                return res.render('register/index', { account: account });
            }
            
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            })
        })
    }
}