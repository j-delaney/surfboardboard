var data = require('./../data.json');

module.exports = function (app) {
    app.get('/list-gear/list-choose-type', function (request, response, next) {
        response.render('list-gear/list-choose-type');
    });

    app.get('/list-gear/list-steps', function (request, response, next) {
        response.render('list-gear/list-steps');
    });

    app.get('/list-gear/listing-confirmation/:id', function (request, response, next) {
        response.render('list-gear/listing-confirmation', {
            id: request.params['id']
        });
    });
};