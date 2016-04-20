'use strict';

module.exports = function (app) {
    
    app.use('/', require('./routes'));
    app.use('/login', require('./routes/login'));
    app.use('/register', require('./routes/register'));
}