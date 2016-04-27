var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    town:     { type: Schema.Types.ObjectId, ref: 'Town' },
    lending:  [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    borrowing:[{ type: Schema.Types.ObjectId, ref: 'Book'}]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);