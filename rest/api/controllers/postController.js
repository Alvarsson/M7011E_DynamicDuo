'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  PostManager = mongoose.model('Manager');

exports.manager = function(req, res) {
  const post = new PostManager({
      id: req.body.id,
      marketprice: req.body.marketprice,
      production: req.body.production,
  });
  post.save()
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json({ message: err});
  });
}

exports.lisas = function(req, res) {
  res.json("hej");
}

exports.mango = function(req, res) {
  res.json("Controller says hey from mango");
}

exports.mellanmango = function(req, res) {
  res.json("Controller says mellanmango");
}
