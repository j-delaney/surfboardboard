var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    owner: Schema.Types.ObjectId,
    picture: String,
    price: Number,
    description: String,
    city: String,
    zip: Number,
    title: String,
    custom: Schema.Types.Mixed
});

module.exports = mongoose.model('Item', itemSchema);