var Feedback = require('./../models/feedback');
var Track = require('./../models/track');
var User = require('./../models/user');
var util = require('util');
var async = require('async');

module.exports = function (app) {
    app.get('/admin/analytics', function (request, response, next) {
        if (!request.isAuthenticated || !request.user.admin) {
            return response.status(401);
        }

        //session: Number
        //errorRate: Number
        //newEdit: Boolean
        //user: User,
        //feedback: Feedback

        Track.find({}, function (err, tracks) {
            if (err) {
                throw err;
            }

            var data = {
                tracks: []
            };

            async.each(tracks, function (track, cb) {
                User.findById(track.user, function (err, user) {
                    if (err) {
                        return cb(err);
                    }

                    var row = {
                        errorRate: track.errorRate,
                        newEdit: track.newEdit,
                        user: user,
                        item: track.item,
                        created: track.created
                    };

                    Feedback.findOne({
                        session: track.session
                    }, function (err, feedback) {
                        if (err) {
                            return cb(err);
                        }

                        row.feedback = feedback;
                        data.tracks.push(row);
                        return cb();
                    });
                });
            }, function (err) {
                if (err) {
                    throw err;
                }

                return response.render('admin/analytics', data);
            });
        })
    });
};