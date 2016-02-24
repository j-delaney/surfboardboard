var data = require('./../data.json');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function (app, passport) {
    // Passport time!
    passport.use(new FacebookStrategy({
            clientID: '437731739750205',
            clientSecret: process.env.FBSECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'profileUrl', 'email']
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        console.log(profile);

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.profileUrl = profile.profileUrl;

                        // save our user to the database
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(request, response, next) {

        // if user is authenticated in the session, carry on
        if (request.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        response.redirect('/');
    }

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );

    app.get('/test', function (request, response, next) {
        response.render('usertest');
    })

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_friends']}));

    app.get('/edit-profile', function (request, response, next) {
        response.render('edit-profile');
    });

    app.get('/', function (request, response, next) {
        response.render('index');
    });

    app.get('/profile', function (request, response, next) {
        response.render('profile');
    });

    app.get('/signup', function (request, response, next) {
        response.render('signup');
    });

    app.get('/list-gear/list-choose-type', function (request, response, next) {
        response.render('list-gear/list-choose-type');
    });

    app.get('/list-gear/list-steps', function (request, response, next) {
        response.render('list-gear/list-steps');
    });

    app.post('/api/list', function (request, response, next) {
        var newId = data.tents.length;
        data.tents.push({
            "id": newId,
            "owner": 0,
            "title": request.body.title,
            "pictures": [
                "/img/upload/items/sundome1.jpg"
            ],
            "people": request.body.holds,
            "price": request.body.price,
            "brand": "Coleman",
            "reviews": {
                "count": 1,
                "stars": 5
            },
            "location": request.body.address,
            "description": request.body.desc
        });

        response.json({
            id: newId
        });
    });

    app.get('/list-gear/list-message', function (request, response, next) {
        response.render('list-gear/list-message');
    });

    app.get('/list-gear/list-edit-title', function (request, response, next) {
        response.render('list-gear/list-edit-title');
    });

    app.get('/list-gear/list-edit-description', function (request, response, next) {
        response.render('list-gear/list-edit-description');
    });

    app.get('/list-gear/list-price', function (request, response, next) {
        response.render('list-gear/list-price');
    });

    app.get('/list-gear/list-product-details', function (request, response, next) {
        response.render('list-gear/list-product-details');
    });

    app.get('/list-gear/list-edit-description', function (request, response, next) {
        response.render('list-gear/list-price');
    });

    app.get('/list-gear/listing-confirmation/:id', function (request, response, next) {
        response.render('list-gear/listing-confirmation', {
            id: request.params['id']
        });
    });

    app.get('/find-gear/choose-type', function (request, response, next) {
        response.render('find-gear/choose-type');
    });

    app.get('/find-gear/prelim-filter', function (request, response, next) {
        response.render('find-gear/prelim-filter');
    });

    app.get('/find-gear/results', function (request, response, next) {
        response.render('find-gear/results', data);
    });

    app.get('/find-gear/payment', function (request, response, next) {
        response.render('find-gear/payment', data);
    });

    app.get('/view/:id', function (request, response, next) {
        var tent = data.tents[request.params['id']];
        var owner = data.users[tent.owner];

        response.render('view', {
            tent: tent,
            owner: owner
        });
    });

    app.get('/find-gear/request-confirmation', function (request, response, next) {
        response.render('find-gear/request-confirmation');
    });
};