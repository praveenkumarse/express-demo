var express=require("express");
var app = express();
    const passport = require('passport');
    const Auth0Strategy = require('passport-auth0');

    // Configure Passport to use Auth0
    const strategy = new Auth0Strategy({
            domain: 'praveenkumarse.auth0.com',
            clientID: '7Yrl8WKbYcMG0Q4UfuR2yMKxwqIdZsuS',
            clientSecret: 'jdME03-bgfX6JlvVW_pFzs_Rgba_GYNbt3b2t9sMEAl4LdQ9EWSundHyb4mD4XhW',
            callbackURL: 'http://localhost:3000/callback'
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            return done(null, profile,extraParams);
        }
    );

    passport.use(strategy);

    // This can be used to keep a smaller payload
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
app.use(passport.session());


