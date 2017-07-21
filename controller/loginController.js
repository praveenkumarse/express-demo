var jwt = require('jsonwebtoken');
var User = require('../model/loginModel');
var authConfig = require('./../config/key');

function generateToken(user) {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 200
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email
    };
}

exports.login = function(req, res, next) {

    var userInfo = setUserInfo(req.body);
    res.status(200).json({
        token: generateToken(userInfo),
        user: userInfo
    });

}

exports.register = function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }

    if (!password) {
        return res.status(422).send({ error: 'You must enter a password' });
    }

    User.findOne({ email: email }, function(err, existingUser) {

        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use' });
        }

        var user = new User({
            email: email,
            password: password,
            role: role
        });

        user.save(function(err, user) {

            if (err) {
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: generateToken(userInfo),
                user: userInfo
            })

        });

    });

}

exports.roleAuthorization = function(roles) {

    return function(req, res, next) {
        var authorization = req.get('Authorization')
        var user;
        jwt.verify(authorization, authConfig.secret, function(err, token) {
            if (err) {
                console.log(err)
                res.status(401).json({ error: 'Token expired' });
            } else {
                console.log("token")
                User.find(token.email, function(err, foundUser) {
                    if (err) {
                        res.status(422).json({ error: 'No user found.' });
                        return next(err);
                    }

                    if (roles.indexOf(foundUser[0].role) > -1) {
                        return next();
                    }

                    res.status(401).json({ error: 'You are not authorized to view this content' });
                    return next('Unauthorized');

                });
            }
        })


    }
}