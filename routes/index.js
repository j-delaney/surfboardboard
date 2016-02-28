var data = require('./../data.json');

module.exports = function (app, passport) {
    require('./auth')(app, passport);
    require('./api')(app);
    require('./find-gear')(app);
    require('./list-gear')(app);
    require('./home')(app);
};