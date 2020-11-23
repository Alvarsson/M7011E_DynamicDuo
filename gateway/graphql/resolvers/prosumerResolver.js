const { query } = require("express");

const mongoose = require("mongoose");

weatherData = { temp: 32, windspeed: 4 };

var windspeedSchema = mongoose.Schema({
  tick: Number,
  data: Number,
});

const weatherSpeeds = mongoose.model("yolo", windspeedSchema);

prosumers = [
  { id: 1, body: "WAt" },
  { id: 2, body: "aaaa" },
];

module.exports = {
  Query: {
    weatherData() {
      return weatherData;
    },
    get_prosumer: (_, args) => prosumers[parseInt(args.id) - 1],
    get_temp: (_,args) => {
      console.log(args);
      return args;
    }
  },
  Weather: {
    tick: (parent) => parent.temp,
    data: (parent) => parent.windspeed,

  },
  Mutation: {
    set_prosumer: (root, args, context, info) => {
      var bool = false;
      return bool;
    },
    set_temp: (_,args) => {
      console.log(args);
      var newData = new weatherSpeeds({tick: args.tick, data: args.data});
      return new Promise((resolve, reject) => {
        newData.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },

  },
  Prosumer: {
    id: (parent) => parent.id,

  },
  /* imgUrl: String
    distribution : Distribution
    batteryWarningThreshold: Float
    loginCredentials: LoginCredentials */
  /* Distribution: {

  },
  LoginCredentials: {

  }, */
};
