'use strict';

var mongoose = require('mongoose'),
Util = require('../util/api_utils'),
ProsumerSettings = mongoose.model('ProsumerSettings');


exports.get_prosumer_setting = function(req, res) {
  ProsumerSettings.findOne({id:req.params.id}, function(err, prosumer) {
    if (err){
      res.send("sum ting wong");
    } else{
      if (prosumer != null){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        prosumer.login_credentials.password ="no you, mr hackerman"; // sophisticated password protection
        res.json(prosumer);
      } else{
        res.statusCode = 404;
        res.send();
      }
    }
  });    
}

exports.update_prosumer_settings_img_url = function(req,res) {
  console.log(req.params.id);
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{img_url:req.body.img_url}},function(err, prosumer) {
    if(err) {
      res.statusCode = 418;
      res.send("sum ting wong when updating img url");
    } else{
      res.statusCode = 204;
      res.send();
    }
    
  });
}

exports.update_prosumer_settings_password = function(req,res) {
  /* --- for testing ---*/
  var check = new Map();
  var body = new Map();
  var login = new Map();
  login.set('password', 0);
  body.set('login_credentials', login);
  check.set('body', body);
  var valid = Util.validBody(req, check);
  if(!valid){
    res.statusCode = 400;
    res.send('BADU INPUTTUH');
    return;
  } else{
    ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{"login_credentials.password": req.body.login_credentials.password}},function(err, prosumer) {
      if(err) {
        res.statusCode = 418;
        res.send("sum ting wong when updating password");
      } else{
        res.statusCode = 204;
        res.send();
      }
    });
  }
  /* --- for testing ---*/
  
}

exports.update_prosumer_settings_distr_over = function(req,res) {
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{"distribution.sell": req.body.distribution.sell, "distribution.store": req.body.distribution.store}},function(err, prosumer) {
    if(err) {
      res.statusCode = 418;
      res.send("sum ting wong when updating distr over");
    } else{
      res.statusCode = 204;
      res.send();
    }
  });
}

exports.update_prosumer_settings_distr_under = function(req,res) {
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{"distribution.buy": req.body.distribution.buy, "distribution.drain": req.body.distribution.drain}},function(err, prosumer) {
    if(err) {
      res.statusCode = 418;
      res.send("sum ting wong when updating distr under");
    } else{
      res.statusCode = 204;
      res.send();
    }
  });
}

exports.update_prosumer_settings_battery_warning_threshold = function(req,res) {
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{battery_warning_threshold: req.body.battery_warning_threshold}},function(err, prosumer) {
    if(err) {
      res.statusCode = 418;
      res.send("sum ting wong when updating battery warning threshold");
    } else{
      res.statusCode = 204;
      res.send();
    }
  });
}

exports.update_prosumer_settings_online = function(req,res) {
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{"login_credentials.online": req.body.login_credentials.online}},function(err, prosumer) {
    if(err) {
      res.statusCode = 418;
      res.send("sum ting wong when updating online");
    } else{
      res.statusCode = 204;
      res.send();
    }
  });
}


exports.add_prosumer_setting = function (req,res) {
  // check that everything is defined.
  try{
    if(req.body.id == undefined){
      throw "Prosumer Id undefined.";
    }
    if(req.body.img_url == undefined){
      throw "Prosumer img_url undefined.";
    }
    if(req.body.distribution == undefined || req.body.distribution.sell == undefined || req.body.distribution.store == undefined || req.body.distribution.buy == undefined || req.body.distribution.drain == undefined){
      throw "Prosumer distribution undefined.";
    }
    if(req.body.battery_warning_threshold == undefined){
      throw "Prosumer battery_warning_threshold undefined.";
    }
    if(req.body.login_credentials == undefined || req.body.login_credentials.password == undefined || req.body.login_credentials.online == undefined){
      throw "Prosumer Id undefined.";
    }
    //check that the Id doesnt already exist.
    ProsumerSettings.findOne({id:req.body.id}, function(err, t) {
      if(t != null){
        throw "Prosumer id already registered."
      }
    });

    //insert new prosumer:
    ProsumerSettings.create({id:req.body.id, img_url: req.body.img_url, distribution: {sell: req.body.distribution.sell, store: req.body.distribution.store, buy:req.body.distribution.buy, drain:req.body.distribution.drain}, battery_warning_threshold: req.body.battery_warning_threshold, login_credentials:{password:req.body.login_credentials.password, online: req.body.login_credentials.online}}, function(err, prosumer) {
      if(err){
        res.statusCode = 418;
        res.send("sum ting wooong");
      } else {
        res.json("insertade skitN");
      }
    });
  } catch(e){
    console.log(e);
    res.statusCode = 418;
    res.send("Something went wrong: " + e)
  }
  // inserta ny prosumersetting:
}