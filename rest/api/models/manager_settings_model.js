'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginCredentialsSchema = new Schema({
    password: {
        type: String,
    },
    online: {
        type: Number,
    }
});

var ManagerSettingsSchema = new Schema ({
    id: {
        type: String,
        Unique: true,
        Required: 'Kindly enter the manager id'
    },
    img_url: {
        type: String,
        default: 'http://www.placecage.com/500/600'
    },
    battery_warning_threshold: {
        type: Number,
        //default 200 of sumfing
    },
    login_credentials: {
        type: LoginCredentialsSchema,
        Required: "Give me some credentials pliz"
    }
});

module.exports = mongoose.model('ManagerSettings', ManagerSettingsSchema);