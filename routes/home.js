var Item = require('./../models/item');
var Track = require('./../models/track');
var User = require('./../models/user');
var path = require('path');
var lib = require('./lib');
var util = require('util');

module.exports = function (app) {
    app.get('/edit/:type', function (request, response, next) {
        var type = request.params['type'];
        if (util.isNullOrUndefined(request.session.newEdit)) {
            request.session.newEdit = (Math.random > 0.5);
        }

        if (!request.session.newEdit) {
            return response.redirect('/list-gear/list-steps/' + type);
        }

        request.session.track = Math.floor(Math.random() * 9999999999);

        var track = Track({
            session: request.session.track,
            cookieSession: request.session.id,
            errorRate: 0,
            newEdit: true
        });

        if (request.isAuthenticated()) {
            track.user = request.user.id;
        }

        track.save(function (err, track) {
            if (err) {
                throw err;
            }

            response.render('edit', {
                type: type
            });
        });
    });

    var uploadFn = lib.upload.single('picture');
    app.post('/edit/:type', uploadFn, function (request, response, next) {
        var type = request.params['type'];
        var errors;

        if (!request.file) {
            return response.render('edit', {
                errors: ['You must include a picture.'],
                form: request.body,
                type: type
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
            custom: {},
            type: type,
            newEdit: true
        });

        if (type === 'tent') {
            item.custom.people = request.body.people;
        } else if (type === 'surfboard') {
            item.custom.type = request.body.type;
        } else {
            return response.status(400);
        }

        if (request.isAuthenticated()) {
            item.published = true;
            item.owner = request.user.id;
        } else {
            item.published = false;
        }

        errors = item.baseValidate();
        if (errors) {
            return response.render('edit', {
                errors: errors,
                form: request.body,
                type: type
            });
        }

        if (type === 'tent') {
            errors = item.tentValidate();
        } else if (type === 'surfboard') {
            errors = item.surfboardValidate();
        }
        if (errors) {
            return response.render('edit', {
                errors: errors,
                form: request.body,
                type: type
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

    app.get('/profile/edit-profile', function (request, response, next) {
        response.render('profile/edit-profile');
    });

    app.get('/redirect', function (request, response, next) {
        if (request.session.inProgress) {
            var id = request.session.inProgress;
            request.session.inProgress = null;
            Item.findByIdAndUpdate(id, {
                published: true,
                owner: request.user.id
            }, function (err, item) {
                if (err) {
                    throw err;
                }

                return response.redirect('/list-gear/listing-confirmation/' + item.id);
            });
        } else {
            next();
        }
    });

    app.get('/', function (request, response, next) {
        response.render('index');
    });

    app.get('/profile/index', function (request, response, next) {
        response.render('profile/index');
    });

    app.get('/signup', function (request, response, next) {
        response.render('signup');
    });

    app.get('/profile/creation', function (request, response, next) {
        response.render('profile/creation');
    });


    app.get('/view/:id', function (request, response, next) {
        Item.findById(request.params['id'], function (err, item) {
            if (err) {
                throw err;
            }

            if (!item) {
                response.send('Not found');
            }

            User.findById(item.owner, function (err, owner) {
                if (err) {
                    throw err;
                }

                response.render('view', {
                    tent: item,
                    owner: owner
                });
            });
        });
    });
};