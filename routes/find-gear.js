var data = require('./../data.json');
var Item = require('./../models/item');

module.exports = function (app) {
    app.get('/find-gear/choose-type', function (request, response, next) {
        response.render('find-gear/choose-type');
    });

    app.get('/find-gear/prelim-filter', function (request, response, next) {
        response.render('find-gear/prelim-filter');
    });

    app.get('/find-gear/results', function (request, response, next) {
        Item.find({
            type: 'tent'
        }, function (err, tents) {
            if (err) {
                throw err;
            }

            response.render('find-gear/results', {
                tents: tents
            });
        });
    });

    app.get('/find-gear/payment', function (request, response, next) {
        response.render('find-gear/payment', data);
    });

    app.get('/find-gear/request-confirmation', function (request, response, next) {
        response.render('find-gear/request-confirmation');
    });
};