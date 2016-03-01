var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    user: Schema.Types.ObjectId,
    rating: String, // Frown, Meh, Smile
    comment: String,
    path: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);