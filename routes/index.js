var express = require('express');
var router = express.Router();

var data = require('./../data.json');

router.get('/', function (request, response, next) {
    response.render('index');
});

router.get('/find-gear/choose-type', function (request, response, next) {
    response.render('find-gear/choose-type');
});

router.get('/find-gear/results', function (request, response, next) {
    response.render('find-gear/results', data);
});

router.get('/view/:id', function (request, response, next) {
    console.log(data.tents[request.params['id']]);
    response.render('view', data.tents[request.params['id']]);
});

module.exports = router;
