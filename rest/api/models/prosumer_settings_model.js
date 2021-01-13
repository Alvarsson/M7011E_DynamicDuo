'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginCredentialsSchema = new Schema({
    password: {
        type: String,
    },
    online: {
        type: Number,
        //default: 2
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
    },
    buy: {
        type: Number,
        //default: 1
    },
    drain: {
        type: Number,
        //default: 0
    },
});


var ProsumerSettingsSchema = new Schema({
    id: {
      type: String,
      Unique: true,
      Required: 'Kindly enter id of the prosumer'
    },
    img_url: {
      type: String,
      default: 'http://www.placecage.com/500/600'
    },
    distribution: {
      type: DistributionSchema,
      Required: "Pls distribution"
    },
    blocked: {
        type: Number,
    },
    broken: {
        type: Number,
    },
    battery_warning_threshold: {
        type: Number,
        //default: 30
    },
    login_credentials: {
        type: LoginCredentialsSchema,
        Required: "Pls credentials"
    }
  });

module.exports = mongoose.model('ProsumerSettings', ProsumerSettingsSchema);