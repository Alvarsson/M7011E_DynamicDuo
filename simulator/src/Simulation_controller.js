const db = require("./models");
const axios = require("axios");
const TestModel = db.testmodel;
const WeatherSpeedsModel = db.weatherSpeeds;
const ProsumerSettings = db.prosumerSettings;

exports.fillWeatherDataOnce = (data) => {
  console.log("filling weather data?");
  windspeeds = [];
  for (index in data) {
    //console.log("windspeed", windspeed)
    windspeeds.push({
      tick: index,
      wind_speed: data[index], //HAAHAHAAH :(
    });
  }
  
  axios
    .post(`http://rest:3001/windspeed/many`, windspeeds)
    .then(() => {
      console.log("i posted weatherspeed boi");
    })
    .catch((error) => {
      console.log("WRONG");
      console.log(error);
    });
};
