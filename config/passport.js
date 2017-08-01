var passport = require('passport');
var User = require('../model/loginModel');
var Social = require('../model/socialLogin');
var config = require('./key');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');

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

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(localLogin);
passport.use(jwtLogin);


passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },

    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            Social.findOne({ 'google.id': profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new Social();
                    newUser.google.push({
                        id: profile.id,
                        token: token,
                        refreshToken: refreshToken,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    })
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));