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

var DistributionSchema = new Schema({
    sell: {
        type: Number,
        //default: 0
    },
    store: {
        type: Number,
        //default: 1
    }
});

var IncProdSchema = new Schema({
    timer: {
        type: Number
    },
    new_prod: {
        type: Number
    }
});

var IncStatusSchema = new Schema({
    timer: {
        type: Number
    },
    new_status: {
        type: Number
    }
});

var ManagerSettingsSchema = new Schema ({
    id: {
        type: String,
        Unique: true,
        Required: 'Kindly enter the manager id'
    },
    market_price: {
        type: Number
    },
    production: {
        type: Number
    },
    PP_status: {
        type: Number
    },
    inc_status_change: {
        type: IncStatusSchema
    },
    inc_prod_change: {
        type: IncProdSchema
    },
    img_url: {
        type: String,
        default: 'http://www.placecage.com/500/600'
    },
    battery_warning_threshold: {
        type: Number,
        //default 200 or sumfing
    },
    distribution: {
        type: DistributionSchema,
        Required: "Pls distribution"
    },
    login_credentials: {
        type: LoginCredentialsSchema,
        Required: "Give me some credentials pliz"
    }
});

module.exports = mongoose.model('ManagerSettings', ManagerSettingsSchema);