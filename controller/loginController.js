var jwt = require('jsonwebtoken');
var User = require('../model/loginModel');
var authConfig = require('./../config/key');

function generateToken(user) {
    return jwt.sign(user, authConfig.secret)
}

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email
    };
}

exports.login = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, data) {
        if (err) throw err;
        data.comparePassword(req.body.password, function (err, match) {
            if (err) throw err;
            if (match) {
                res.status(200).json({
                    token:generateToken(data.email)
                })
            } else {
                res.json("password doesn't exist")
            }
        })
    })
}

exports.register = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;


    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address' });
    }

    if (!password) {
        return res.status(422).send({ error: 'You must enter a password' });
    }

    User.findOne({ email: email }, function (err, existingUser) {

        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use' });
        }

        var user = new User({
            name: req.body.name,
            email: email,
            password: password,
            role: req.body.role
        });

        user.save(function (err, user) {

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

