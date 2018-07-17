const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo')(session);
require('./config/passportConfig');

const port = process.env.port || 3000;

var app = express();
app.listen(port, () => {
    console.log('server up on port ' + port);
});

//db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/authProject').then(() => {
    console.log("db up and connected");
}).catch((err) => {
    console.log(err);
});

//setting template engine
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//session middleware
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.person = req.user;
    next();
});

//routes
app.use(require('./Routes/Routes'));