'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');


// const test = (i) => {
//   return Promise.resolve(5);
// }



exports.lisas = function(req, res) {
  //var r = {id: "lisa"};
  var new_task = new Task({name: "lisa"});
  new_task.save(function(err, x) {
    if (err)
      res.send(err);
      res.json(x);
  });
}
