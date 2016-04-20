'use strict';

module.exports = function (app) {
    
    app.use('/', require('./routes'));
    //app.use('/todo', require('./routes/todo'));
}