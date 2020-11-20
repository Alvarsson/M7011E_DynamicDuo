const db = require("../src/models");
const TestModel = db.testmodel;
const WeatherSpeedsModel = db.weatherSpeeds;

// Create and Save a new Tutorial
exports.create = () => {
  // Validate request

  // Create a Tutorial
  const testmodel = new TestModel({
    title: "tx",
  });
  // Save Tutorial in the database
  testmodel
    .save(testmodel)
    .then((data) => {
      console.log("added bull---- data");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

exports.fillWeatherDataOnce = (data) => {
  // Validate request

  // Create a Tutorial
  var i = 1;
  var windspeeds = [];
  console.log(data);

  for (windspeed in data) {
    console.log(windspeed);

    windspeeds.push({
      tick: i++,
      data: data[windspeed], //HAAHAHAAH
    }); //kanske kan göra det här när vi genererar datan istället
  }
  console.log(windspeeds);

  WeatherSpeedsModel.find({}).then((data) => {
    if(data.length==0){
        WeatherSpeedsModel.insertMany(windspeeds)
        .then((data) => {
          console.log("inserted some weather data");
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred.",
          });
        });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  });


  
};
