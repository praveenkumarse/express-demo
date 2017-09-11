var homeController = require("./../controller/homeController")

var AuthenticationController = require('./../controller/loginController'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        home = express.Router();

    // Auth Routes
    app.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({ content: 'Success' });
    });
    authRoutes.get('/profile', function (req, res) {
        res.json("login");
    });
    //Social Login

    authRoutes.get('/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        accessType: 'offline',
        prompt: 'consent'
    }));

    authRoutes.get('/callback',
        passport.authenticate('google', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    // home Routes
    apiRoutes.use('/home', home);
    home.get('/', requireAuth, homeController.get_home_info)
        .post('/', requireAuth, homeController.post_home_info)
        .put('/:id', requireAuth, homeController.update_home_info)
        .delete('/:id', requireAuth, homeController.delete_home_info)
        .post('/upload', requireAuth, homeController.home_image_upload)
        .post('/productlist',requireAuth, homeController.add_product_list)
        .get('/productlist',requireAuth, homeController.get_product_list);

    // Set up routes
    app.use('/api', apiRoutes);
}