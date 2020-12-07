'use strict'

const dotenv = require('dotenv');
dotenv.config();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT = 10;

var userSchema = new Schema({
    id: {
        type: String,
        Required: [true, 'id is required'],
        Unique: true,
    },
    password: {
        type: String,
        Required: [true, 'password is required'],
        minlength: 5,
    },
    token: {
        type: String
    }
});

// saving user data
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) { // check if pw field is avaliable and modified.
        bcrypt.genSalt(SALT, function(err, salt) {
            if (err) {
                return next(err);
            } 
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


// comparing users entered pw with db during login

userSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callBack(err);
        }
        callBack(null, isMatch);
    });
}

// genereating token when logged in
userSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jwt.sign(user._id.toHextString(), process.env.SECRET);
    user.token = token;
    user.save(function (err, user) {
        if (err) {
            return callBack(err);
        }
        callBack(null, user);
    });
};

// validate token for authenticate middleware routes
userSchema.statics.findByToken = function(token, callBack) {
    var user = this;
    jwt.verify(token, process.env.SECRET, function(err, decode) {
        // the decode must give user_id if token is valid.
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if(err) {
                return callBack(err);
            }
            callBack(null, user);
        });
    });
};

module.exports = mongoose.model('User', userSchema);



