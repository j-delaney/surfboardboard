var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
    session: Number,
    errorRate: Number,
    newEdit: Boolean, // Whether it was made with the new /edit page
    user: Schema.Types.ObjectId,
    item: Schema.Types.ObjectId,
    created: {
        type: Date,
        default: Date.now
    },
    finished: Date
});

module.exports = mongoose.model('Track', trackSchema);