'use strict'

var mongoose = require('mongoose'),
ManagerLog = mongoose.model('ManagerLog');

// will this find the latest log?
exports.get_manager_log = function(req,res) {
    ManagerLog.find.sort({_id: "-1" }).limit(1)
}

exports.add_manager_log = function(req,res) {
    
}