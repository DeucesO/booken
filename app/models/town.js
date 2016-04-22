var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Town = new Schema({
    name:   { type: String, unique: true }
})

module.exports = mongoose.model('Town', Town);