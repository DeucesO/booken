'use strict';

module.exports = function (app) {
    
    app.use('/', require('./routes'));
    app.use('/account', require('./routes/account'));
}