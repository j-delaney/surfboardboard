var data = require('./../data.json');
var Item = require('./../models/item');
var User = require('./../models/user');

module.exports = function (app) {
    app.get('/edit', function (request, response, next) {
        response.render('edit');
    });

    app.get('/profile/edit-profile', function (request, response, next) {
        response.render('profile/edit-profile');
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