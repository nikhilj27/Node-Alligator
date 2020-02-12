const mongoose = require('mongoose');
const passport = require('passport');
const ResponseModel = require('../models/response.model');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, doc) => {
        if (!err) {
            const response = new ResponseModel(200, 'Registraion successfull.', doc);
            res.send(response);
        } else {
            if (err.code === 11000) {
                res.status(422).send(['Duplicate email address found.']);
            } else {
                return next(err);
            }
        }
    });
}


module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            const response = new ResponseModel(400, 'Server Error', null);
            return res.send(response);
        } else if (user) {
            const response = new ResponseModel(200, 'Login Successfull', { 'token': user.generateJWT() });
            return res.send(response);
        } else {
            const response = new ResponseModel(404, 'User not found', info);
            return res.send(response);
        }
    })(req, res);
}


module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id }, (err, user) => {
        if (!user) {
            const response = new ResponseModel(404, 'User not found', { status: false });
            return res.send(response);
        } else {
            const response = new ResponseModel(200, 'User details', { user: _.pick(user, ['fullName', 'email']) });
            return res.send(response);
        }
    })
}