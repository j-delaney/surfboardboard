var crypto = require('crypto');
var path = require('path');

exports.isLoggedIn = function (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }

    response.redirect('/auth/facebook');
};