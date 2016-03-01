var lib = require('./lib');
var Item = require('../models/item');
var path = require('path');
var Track = require('./../models/track');
var util = require('util');

module.exports = function (app) {
    app.get('/list-gear/list-choose-type', function (request, response, next) {
        response.render('list-gear/list-choose-type');
    });

    var uploadFn = lib.upload.single('picture');
    app.post('/list-gear/list-steps', uploadFn, function (request, response, next) {
        var errors;

        if (!request.file) {
            return response.render('list-gear/list-steps', {
                errors: ['You must include a picture.'],
                form: request.body
            });
        }

        var picture = '/' + path.relative('./public', request.file.path);
        var item = Item({
            picture: picture,
            price: request.body.price,
            description: request.body.description,
            city: request.body.city,
            zip: request.body.zip,
            title: request.body.title,
            custom: {
                people: request.body.people
            },
            type: 'tent',
            newEdit: false
        });

        if (request.isAuthenticated()) {
            item.published = true;
            item.owner = request.user.id;
        } else {
            item.published = false;
        }

        errors = item.baseValidate();
        if (errors) {
            return response.render('list-gear/list-steps', {
                errors: errors,
                form: request.body
            });
        }

        errors = item.tentValidate();
        if (errors) {
            return response.render('list-gear/list-steps', {
                errors: errors,
                form: request.body
            });
        }

        item.save(function (err, item) {
            if (err) {
                throw err;
            }

            if (request.isAuthenticated()) {
                return response.redirect('/list-gear/listing-confirmation/' + item.id);
            } else {
                request.session.inProgress = item.id;
                return response.redirect('/auth/facebook');
            }
        });
    });


    app.get('/list-gear/list-steps', function (request, response, next) {
        if (util.isNullOrUndefined(request.session.newEdit)) {
            request.session.newEdit = (Math.random() > 0.5);
        }

        if (request.session.newEdit) {
            return response.redirect('/edit');
        }

        request.session.track = Math.floor(Math.random() * 9999999999);

        var track = Track({
            session: request.session.track,
            errorRate: 0,
            newEdit: false
        });

        track.save(function (err, track) {
            if (err) {
                throw err;
            }

            response.render('list-gear/list-steps');
        });
    });

    app.get('/list-gear/listing-confirmation/:id', function (request, response, next) {
        Track.findOneAndUpdate({
            session: request.session.track
        }, {
            user: request.user.id
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