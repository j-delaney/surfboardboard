var data = require('./../data.json');

module.exports = function (app, passport) {
    require('./auth')(app, passport);
    require('./find-gear')(app);
    require('./list-gear')(app);
    require('./home')(app);
    require('./api')(app);
};