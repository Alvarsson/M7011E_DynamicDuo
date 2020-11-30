'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.aexl = function(req, res) {
    res.json('Hello from getterinjo');
}