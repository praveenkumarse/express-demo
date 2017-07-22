const express = require('express');
const passport = require('passport');
const router = express.Router();
const config = require("./../config/auth0");
var request = require("request");
var base64 = require('node-base64-image');
const env = {
    AUTH0_CLIENT_ID: '7Yrl8WKbYcMG0Q4UfuR2yMKxwqIdZsuS',
    AUTH0_DOMAIN: 'praveenkumarse.auth0.com',
    AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

// Perform the login
router.get('/login', passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
}),
    function (req, res) {
        console.log("data", res)
        res.json(res)
    }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/failure'
}), (req, res) => {
    var code = req.query.code;
    console.log("data0", req.user,req.authInfo)
    res.send(req.user)
});




module.exports = router;