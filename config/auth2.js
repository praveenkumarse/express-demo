// Set the configuration settings
const credentials = {
    client: {
        id: 'Vtme66zo5jl1oGvoVRBOJ0iyj0v02Rbi',
        secret: 'YUPf-CVP9_y_7hPDUBAlsAERVUuCCre9SdxBa0cC5SGPsqaoYivXbrA6yvZGall2'
    },
    auth: {
        tokenHost: 'https://api.oauth.com'
    }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);