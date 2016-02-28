var data = require('./../data.json');

module.exports = function (app, passport) {
    require('./auth.js')(app, passport);
    require('./api.js');
    require('./find-gear.js');
    require('./list-gear.js');
    require('./home.js');
};