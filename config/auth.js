module.exports = {

    'facebookAuth': {
        'clientID': 'your-secret-clientID-here', // your App ID
        'clientSecret': 'your-client-secret-here', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '728091718169-itkc0f7n8mpeauj35th0ems5god0aeh6.apps.googleusercontent.com',
        'clientSecret': 'dZ4CYRsEz4aJ6RqwVrOu24N6',
        'callbackURL': 'http://localhost:3000/auth/callback'
    }

};