'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  id: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  img_url: {
    type: String,
    default: 'http://www.placecage.com/500/600'
  },
  distribution: {
    type: Distribution,
    Required: "Pls distribution"
  },
  battery_warning_threshold: {
      type: Number,
      default: 0
  },
  login_credentials: {
      type: LoginCredentials,
      Required: "Pls credentials"
  }
});

var LoginCredentials = new Schema({
    password: {
        type: String,
    },
    online: {
        type: Number,
        default: 0
    }
});

var Distribution = new Schema({
    sell: {
        type: Number,
        default: 0
    },
    store: {
        type: Number,
        default: 1
    },
    buy: {
        type: Number,
        default: 1
    },
    drain: {
        type: Number,
        default: 0
    },
});


module.exports = mongoose.model('Tasks', TaskSchema);