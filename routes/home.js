var data = require('./../data.json');

module.exports = function (app) {
    app.get('/edit', function (request, response, next) {
        response.render('edit');
    });

    app.get('/edit-profile', function (request, response, next) {
        response.render('edit-profile');
    });

    app.get('/', function (request, response, next) {
        response.render('index');
    });

    app.get('/profile', function (request, response, next) {
        response.render('profile');
    });

    app.get('/signup', function (request, response, next) {
        response.render('signup');
    });

    app.get('/profile/creation', function (request, response, next) {
        response.render('profile/creation');
    });


    app.get('/view/:id', function (request, response, next) {
        var tent = data.tents[request.params['id']];
        var owner = data.users[tent.owner];

        response.render('view', {
            tent: tent,
            owner: owner
        });
    });
};