exports.isLogin = (req, res, next) => {
    if (!req.Authenticated()) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.restric = (req, res, next) => {
    if (req.isAuthenticated()) {
        //res.redirect('/profile');
        //console.log("successful");
       res.send('Successful');
    } else {
        next();
    }
}