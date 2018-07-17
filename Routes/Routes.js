const express = require('express');
const passport = require('passport');
const Router = express.Router();

const login = require('../Controllers/LoginController');
const auth = require('../Middleware/passportAuth');

module.exports = Router;

//home page
Router.get('/', require('../Controllers/HomeController'));

//register
Router.get('/register', require('../Controllers/RegisterController').get);
Router.post('/register', require('../Controllers/RegisterController').post);

//login
Router.get('/login', auth.restric, login.get);
Router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));