var data = require('./../data.json');
var Item = require('./../models/item');
var User = require('./../models/user');
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

module.exports = function (app) {
    app.get('/edit', function (request, response, next) {
        response.render('edit');
    });

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img/upload/items');
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) {
                    return cb(err);
                }

                cb(null, raw.toString('hex') + path.extname(file.originalname))
            });
        }
    });

    var upload = multer({
        storage: storage
    });

    var uploadFn = upload.single('picture');
    app.post('/edit', uploadFn, function (request, response, next) {
        var errors;

        if (!request.file) {
            return response.render('edit', {
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
            type: 'tent'
        });

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
                form: request.body
            });
        }

        errors = item.tentValidate();
        if (errors) {
            return response.render('edit', {
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
        }

        next();
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