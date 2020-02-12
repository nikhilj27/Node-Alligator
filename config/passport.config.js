const passport = require('passport');
const localStraegy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStraegy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) {
                    return done(err);
                } else if (!user) {
                    return done(null, false, { message: 'Email is not regisered.' });
                } else if (!user.verifyPassword(password)) {
                    return done(null, false, { message: 'Wrong Password' });
                } else {
                    return done(null, user);
                }
            });
        })
);