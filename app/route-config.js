'use strict';

module.exports = function (app) {
    
    app.use('/', require('./routes'));
    app.use('/account', require('./routes/account'));
    app.use('/lend', require('./routes/lend'));
    app.use('/borrow', require('./routes/borrow'));
}