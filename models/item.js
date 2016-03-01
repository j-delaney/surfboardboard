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
    custom: Schema.Types.Mixed,
    type: String,
    published: Boolean,
    newEdit: Boolean // Whether it was made with the new /edit page
});

itemSchema.methods.baseValidate = function () {
    var errors = [];

    // Picture. Set.
    if (util.isNullOrUndefined(this.picture)) {
        errors.push('You must set a picture.');
    }

    // Price. Set, isNumber, >0.
    if (util.isNullOrUndefined(this.price)) {
        errors.push('You must set a price.');
    }

    this.price = Number(this.price);

    if (isNaN(this.price)) {
        errors.push('Price must be a number.');
    }

    if (this.price <= 0) {
        errors.push('Price must be greater than 0.');
    }

    // Description. Set, not blank.
    if (util.isNullOrUndefined(this.description) || this.description.trim() === '') {
        errors.push('You must set a description.');
    }

    // City. Set, not blank.
    if (util.isNullOrUndefined(this.city) || this.city.trim() === '') {
        errors.push('You must set a city');
    }

    // Zip. Set, isNumber.
    if (util.isNullOrUndefined(this.zip)) {
        errors.push('You must set a zip code.');
    }

    this.zip = Number(this.zip);

    if (isNaN(this.zip)) {
        errors.push('Zip code must be a number.');
    }

    // Title. Set, not blank.
    if (util.isNullOrUndefined(this.title) || this.title.trim() === '') {
        errors.push('You must set a title');
    }

    // Type. Set, in [tent].
    if (util.isNullOrUndefined(this.type)) {
        errors.push('Type must be set.');
    }

    var types = ['tent', 'surfboard'];

    if (types.indexOf(this.type) === -1) {
        errors.push('Invalid type.');
    }

    if (errors.length) {
        return errors;
    }

    return false;
};

itemSchema.methods.surfboardValidate = function () {
    var errors = [];

    //Type. Set, not blank
    if (util.isNullOrUndefined(this.custom.type) || this.custom.type === '') {
        errors.push('You must set the type of your surfboard.');
    }

    if (errors.length) {
        return errors;
    }

    return false;
};

itemSchema.methods.tentValidate = function () {
    var errors = [];

    //People. Set, isNumber, >0.
    if (util.isNullOrUndefined(this.custom.people)) {
        errors.push('You must set the number of people your tent holds.');
    }

    this.custom.people = Number(this.custom.people);

    if (isNaN(this.custom.people)) {
        errors.push('Number of people must be a number.');
    }

    if (this.custom.people <= 0) {
        errors.push('Number of people must be greater than 0.');
    }

    if (errors.length) {
        return errors;
    }

    return false;
};

module.exports = mongoose.model('Item', itemSchema);