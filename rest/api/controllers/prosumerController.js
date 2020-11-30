'use strict';

var mongoose = require('mongoose'),
ProsumerSettings = mongoose.model('ProsumerSettings');


exports.get_prosumer_setting = function(req, res) {
    ProsumerSettings.findOne({id:req.params.id}, function(err, prosumer) {
      if (err){
        res.send("sum ting wong");
      } else{
        console.log(prosumer)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        prosumer.login_credentials.password ="no you, mr hackerman"; // sophisticated password protection
        res.json(prosumer);
      }
    });    
}

// split into paths for each setting
exports.update_prosumer_settings_img_url = function(req,res) {
  console.log(req.params.id);
  ProsumerSettings.findOneAndUpdate({id: req.params.id}, {$set:{img_url:req.body.img_url}},function(err, prosumer) {
    if(err) {
      res.send("sum ting wonger");
    }
    res.statusCode = 204;
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
        res.send("sum ting wooong");
      } else {
        res.json("insertade skitN");
      }
    });
  } catch(e){
    console.log(e);
    res.send("Something went wrong: " + e)
  }
  // inserta ny prosumersetting:
  }