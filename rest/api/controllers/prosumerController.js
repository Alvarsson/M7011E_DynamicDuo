'use strict';

var mongoose = require('mongoose'),
ProsumerSettings = mongoose.model('ProsumerSettings');


exports.get_prosumer_setting = function(req, res) {
  console.log("GOT ZE REQUEST FOR" + req.query.id);
  console.log(req.query.id);
    ProsumerSettings.findOne({id:req.query.id}, function(err, prosumer) {
      if (err){
        res.send("sum ting wong");
      } else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prosumer);
      }
    });    
}

exports.update_prosumer_settings = function(req,res) {
  //console.log(req.body.kropp);
  ProsumerSettings.findOneAndUpdate({id: req.query.id}, {$set:{img_url:req.body.img_url}},function(err, prosumer) {
    if(err) {
      res.send("sum ting wonger");
    }
    console.log("JAMEN JO");
    res.statusCode = 200; // should be some other code
    res.json({message:"successfully updated prosumer"});
  });
}

exports.add_prosumer_setting = function (req,res) {

  // kolla att den har all skit
  // kolla att idt inte redan är upptaget.

  // inserta ny prosumersetting:
  ProsumerSettings.create({id:"eeh"}, function(err, prosumer) {
    if(err){
      res.send("sum ting wooong");
    } else {
      res.json("insertade skitN");
    }
  });
}