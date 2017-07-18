module.exports = function(app) {
    const passport = require('passport');
    const Auth0Strategy = require('passport-auth0');

    // Configure Passport to use Auth0
    const strategy = new Auth0Strategy({
            domain: 'praveenkumarse.auth0.com',
            clientID: '1prr60921BHGBdweKJYWwn3mUi2CaP34',
            clientSecret: 'BInuDysugNp_9g94Zs88QefVx-25zynvBR2xSJZHxymLPMRv7O-TR_g75MltbHz0',
            callbackURL: 'http://localhost:3000/callback'
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            return done(null, profile);
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

    // ...
    app.use(passport.initialize());
    app.use(passport.session());
}