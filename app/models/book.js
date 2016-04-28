var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    isbn:   Number,
    owner: { type: Schema.Types.ObjectId, ref: 'Account' },
    borrower: { type: Schema.Types.ObjectId, ref: 'Account'}
})

module.exports = mongoose.model('Book', Book);