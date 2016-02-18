var express = require('express');
var router = express.Router();

var data = require('./../data.json');

router.get('/', function (request, response, next) {
    response.render('index');
});

router.get('/list-gear/list-choose-type', function (request, response, next) {
    response.render('list-gear/list-choose-type');
});

router.get('/list-gear/list-steps', function (request, response, next) {
    response.render('list-gear/list-steps');
});

router.get('/list-gear/list-message', function (request, response, next) {
    response.render('list-gear/list-message');
});

router.get('/list-gear/list-edit-title', function (request, response, next) {
    response.render('list-gear/list-edit-title');
});

router.get('/list-gear/list-edit-description', function (request, response, next) {
    response.render('list-gear/list-edit-description');
});

router.get('/list-gear/list-price', function (request, response, next) {
    response.render('list-gear/list-price');
});

router.get('/list-gear/list-product-details', function (request, response, next) {
    response.render('list-gear/list-product-details');
});

router.get('/list-gear/list-edit-description', function (request, response, next) {
    response.render('list-gear/list-price');
});

router.get('/list-gear/listing-confirmation', function (request, response, next) {
    response.render('list-gear/listing-confirmation');
});




router.get('/find-gear/choose-type', function (request, response, next) {
    response.render('find-gear/choose-type');
});

router.get('/find-gear/prelim-filter', function (request, response, next) {
    response.render('find-gear/prelim-filter');
});

router.get('/find-gear/results', function (request, response, next) {
    response.render('find-gear/results', data);
});

router.get('/view/:id', function (request, response, next) {
    var tent =  data.tents[request.params['id']];
    var owner = data.users[tent.owner];

    response.render('view', {
        tent: tent,
        owner: owner
    });
});

router.get('/find-gear/request-confirmation', function (request, response, next) {
    response.render('find-gear/request-confirmation');
});

module.exports = router;
