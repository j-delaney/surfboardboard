var lib = require('./lib');
var Item = require('../models/item');
var path = require('path');
var Track = require('./../models/track');
var util = require('util');

module.exports = function (app) {
    app.get('/list-gear/list-choose-type', function (request, response, next) {
        response.render('list-gear/list-choose-type');
    });

    app.get('/list-gear/list-steps/:type', function (request, response, next) {
        var type = request.params['type'];
        return response.redirect('/edit/' + type);
    });

    app.get('/list-gear/listing-confirmation/:id', function (request, response, next) {
        Track.findOneAndUpdate({
            session: request.session.track
        }, {
            user: request.user.id,
            item: request.params['id'],
            finished: Date.now()
        }, function (err) {
            if (err) {
                throw err;
            }

            return response.render('list-gear/listing-confirmation', {
                id: request.params['id']
            });
        });
    });
};