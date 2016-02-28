var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());

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

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_friends']}));
};