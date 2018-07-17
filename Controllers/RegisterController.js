var userModel = require('../Model/User');

exports.get = (req, res) => {
    res.render('Register');
}

exports.post = (req, res) => {
    var user = new userModel({
        _name: req.body.NAME,
        _email: req.body.EMAIL,
        _password: req.body.PASSWORD,
        _age: req.body.AGE
    });

    user.save().then(() => res.redirect('/'))
    .catch((err) => res.send('registser not successful'));
}