const passport = require('passport');
const userModel = require('../Model/User');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id).then((user) => {
        if (!user) return done(null, false);
        done(null, user);
    });
});

passport.use('local', new localStrategy({
    usernameField: 'EMAIL',
    passwordField: 'PASSWORD',
    passReqToCallback: true,
}, function (req, EMAIL, PASSWORD, done) {
    userModel.findOne({
        _email: EMAIL
    }).then((user) => {
        if (!user) return done(null, false);
        user.comparePassword(PASSWORD, (error, isMatch) => {
            if (!isMatch) return done(null, false);
            done(null, user);
        });

    }).catch((err) => {
        done(err);
    });

}));