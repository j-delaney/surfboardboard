var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/upload/items');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) {
                return cb(err);
            }

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        });
    }
});

exports.upload = multer({
    storage: storage
});

exports.isLoggedIn = function (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }

    response.redirect('/auth/facebook');
};