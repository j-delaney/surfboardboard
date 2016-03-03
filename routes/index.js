var data = require('./../data.json');

module.exports = function (app, passport) {
    require('./auth')(app, passport);

    app.use(function (request, response, next) {
        response.locals.user = request.user;
        next();
    });

    require('./find-gear')(app);
    require('./list-gear')(app);
    require('./home')(app);
    require('./api')(app);
    require('./admin')(app);
};