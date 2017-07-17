var passport = require('passport');
var User = require('../model/loginModel');
var config = require('./auth');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var LocalStrategy = require('passport-local').Strategy;
var localOptions = {
    usernameField: 'email'
};

var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({
        email: email
    }, function(err, user) {

        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { error: 'Login failed. Please try again.' });
        }

        user.comparePassword(password, function(err, isMatch) {

            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false, { error: 'Login failed. Please try again.' });
            }

            return done(null, user);

        });

    });

});


var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload._id, function(err, user) {

        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }

    });

});

passport.use(localLogin);
passport.use(jwtLogin);

