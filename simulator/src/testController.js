const db = require("../src/models");
const TestModel = db.testmodel;
const WeatherSpeedsModel = db.weatherSpeeds;
const ProsumerSettings = db.prosumerSettings;

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
      console.log("added bullFUCKINGSLUTSHIT data");
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

  for (windspeed in data) {

    windspeeds.push({
      tick: i++,
      data: data[windspeed], //HAAHAHAAH :(
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

  exports.createProsumer = () => {
    // TODO: this should include the entire creation of all prosumer data. 
    // Maybe not the object itselves but atleast the starting dist and
    // prosumer log is included in this I suppose?
  }

  
};
