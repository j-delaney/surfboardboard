var mongoose = require('mongoose');
var util = require('util');
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

itemSchema.methods.baseValidate = function () {
    // Picture. Set.
    if (util.isNullOrUndefined(this.picture)) {
        return 'You must set a picture.'
    }

    // Price. Set, isNumber, >0.
    if (util.isNullOrUndefined(this.price)) {
        return 'You must set a price.';
    }

    this.price = Number(this.price);

    if (isNaN(this.price)) {
        return 'Price must be a number.';
    }

    if (this.price <= 0) {
        return 'Price must be greater than 0.';
    }

    // Description. Set, not blank.
    if (util.isNullOrUndefined(this.description) || this.description.trim() === '') {
        return 'You must set a description.';
    }

    // City. Set, not blank.
    if (util.isNullOrUndefined(this.city) || this.city.trim() === '') {
        return 'You must set a city';
    }

    // Zip. Set, isNumber.
    if (util.isNullOrUndefined(this.zip)) {
        return 'You must set a zip code.';
    }

    this.zip = Number(this.zip);

    if (isNaN(this.zip)) {
        return 'Zip code must be a number.'
    }

    // Title. Set, not blank.
    if (util.isNullOrUndefined(this.title) || this.title.trim() === '') {
        return 'You must set a title';
    }

    return false;
};

itemSchema.methods.tentValidate = function () {
    //People. Set, isNumber, >0.
    if (util.isNullOrUndefined(this.custom.people)) {
        return 'You must set the number of people your tent holds.';
    }

    this.custom.people = Number(this.custom.people);

    if (isNaN(this.custom.people)) {
        return 'Number of people must be a number.'
    }

    if (this.custom.people <= 0) {
        return 'Number of people must be greater than 0.';
    }

    return false;
};

module.exports = mongoose.model('Item', itemSchema);