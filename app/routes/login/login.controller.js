'use strict';
module.exports = {
    
    index: function (req, res) {
        res.render('login/index', { title: 'Booken Login' });
    },
    
    login: function (req, res) {
        res.redirect('/');
    },
    
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
}