var express = require('express');
var hbs = require('hbs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Setup database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI, {}, function (error) {
    if (error) {
        console.error('Error connecting to', process.env.MONGOURI);
        console.error(error);
        process.exit(1);
    }
});

var app = express();

// Setup Handlebars as the View Engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require('./hbs-helpers');

// app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var session = require('express-session');
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret

var routes = require('./routes')(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
