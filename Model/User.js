const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var schema = mongoose.Schema;

var userSchema = new schema({
    _name: {
        type: String,
        trim: true,
        require: true
    },
    _age: {
        type: Number,
        require: true
    },
    _email: {
        type: String,
        require: true
    },
    _password: {
        type: String,
        require: true
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('_password')) next();
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user._password, salt, (error, hash) => {
            user._password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (tempPassword, callback) {
    var user = this;
    bcrypt.compare(tempPassword, user._password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return callback(err);
        }

        console.log(isMatch);
        callback(null, isMatch);
    });
}

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;