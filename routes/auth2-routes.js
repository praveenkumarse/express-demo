'use strict';

const express = require('express');
const credentials = {
    client: {
        id: '1prr60921BHGBdweKJYWwn3mUi2CaP34',
        secret: 'BInuDysugNp_9g94Zs88QefVx-25zynvBR2xSJZHxymLPMRv7O-TR_g75MltbHz0'
    },
    auth: {
        tokenHost: 'https://praveenkumarse.auth0.com'
    }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

const router = express.Router();


// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'notifications',
    state: '3(#0/!~',
});

// Initial page redirecting to Github
router.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callback', (req, res) => {

    const code = req.query.code;
    const options = {
        code,
        redirect_uri: 'http://localhost:3000/callback'
    };

    oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
            console.error('Access Token Error', error);
            return res.json('Authentication failed');
        }

        console.log('The resulting token: ', result);
        const token = oauth2.accessToken.create(result);
        console.log('The resulting token: ', token);
        return res
            .status(200)
            .json(token);
    });
});

router.get('/success', (req, res) => {
    res.send('');
});

router.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

module.exports = router;