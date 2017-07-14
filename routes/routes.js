var homeController = require("./../controller/home")

var AuthenticationController = require('../config/authentication'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        home = express.Router();

    // Auth Routes
    app.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.send({ content: 'Success' });
    });

    // home Routes
    apiRoutes.use('/home', home);
    home.get('/', requireAuth, AuthenticationController.roleAuthorization(['admin', 'user']), homeController.get_home_info);
    home.post('/', requireAuth, AuthenticationController.roleAuthorization(['admin', 'user']), homeController.post_home_info);
    home.delete('/', requireAuth, AuthenticationController.roleAuthorization(['admin']), homeController.update_home_info);
    home.delete('/:id', requireAuth, AuthenticationController.roleAuthorization(['admin']), homeController.delete_home_info);

    // Set up routes
    app.use('/api', apiRoutes);

}