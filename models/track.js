var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
    session: Number,
    errorRate: Number,
    newEdit: Boolean, // Whether it was made with the new /edit page
    user: Schema.Types.ObjectId
});

module.exports = mongoose.model('Track', trackSchema);