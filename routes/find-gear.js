var data = require('./../data.json');
var Item = require('./../models/item');
var User = require('./../models/user');
var sendgrid = require('sendgrid')(process.env.SENDGRID);

module.exports = function (app) {
    app.get('/find-gear/choose-type', function (request, response, next) {
        response.render('find-gear/choose-type');
    });

    app.get('/find-gear/prelim-filter', function (request, response, next) {
        response.render('find-gear/prelim-filter');
    });

    app.get('/find-gear/results/:type', function (request, response, next) {
        var type = request.params['type'];

        Item.find({
            type: type,
            published: true
        }, function (err, tents) {
            if (err) {
                throw err;
            }

            response.render('find-gear/results', {
                tents: tents,
                type: type
            });
        });
    });

    app.get('/find-gear/payment', function (request, response, next) {
        response.render('find-gear/payment', data);
    });

    app.get('/find-gear/request-confirmation', function (request, response, next) {
        response.render('find-gear/request-confirmation');
    });

    app.get('/find-gear/message/:id', function (request, response, next) {
        Item.findById(request.params['id'], function (err, item) {
            if (err) {
                throw err;
            }

            if (!item) {
                response.status(404).send('Not found');
            }

            User.findById(item.owner, function (err, owner) {
                if (err) {
                    throw err;
                }

                response.render('find-gear/message', {
                    item: item,
                    owner: owner
                });
            });
        });
    });

    app.post('/find-gear/message/:id', function (request, response, next) {
        Item.findById(request.params['id'], function (err, item) {
            if (err) {
                throw err;
            }

            if (!item) {
                response.status(404).send('Not found');
            }

            User.findById(item.owner, function (err, owner) {
                if (err) {
                    throw err;
                }

                var user = request.user;
                var itemURL = `http://grizz170.herokuapp.com/view/${item.id}`;

                var email = new sendgrid.Email({
                    to: '1letterboy@gmail.com',
                    from: 'no-reply@codesketch.xyz',
                    subject: `Someone wants to rent ${item.title} from you!`,
                    html: `
                    <p>Hi ${owner.facebook.name},</p>
                    <p>Good news! ${user.facebook.name} wants to rent your <a href="${itemURL}">${item.title}</a>. Here's what they said:</p>
                    <p>"${request.body.message}"</p>
                    <p>To respond to ${user.facebook.name} click <a href="mailto:${user.facebook.email}">here</a>.</p>
                    <p></p>
                    <p>Happy Exploring!<br />
                    -The Grizz Team</p>
                    `
                });

                sendgrid.send(email, function (err, json) {
                    if (err) {
                        throw err;
                    }

                    return response.redirect('/find-gear/request-confirmation');
                });
            });
        });

    });
};