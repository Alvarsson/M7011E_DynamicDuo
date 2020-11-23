'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');



exports.lisas = function(req, res) {
  res.json("hej");
}
