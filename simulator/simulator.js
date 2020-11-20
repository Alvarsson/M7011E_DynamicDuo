const mongoose = require("mongoose");
const db = require("./src/models");
const Simulation = require("./src/Simulation");


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


const days = 60;
const nrOfProsumers = 2;
const nrOfconsumers = 44;

const simulator = new Simulation(
  days,
  nrOfProsumers,
  nrOfconsumers
);


// START OF MAIN LOOP KAN JU INTE SE UT SÅHÄR GAHA
simulator.generate_wind_data();

setInterval(simulator.update, 10000); //man kanske kan göra en callback till sig själv och uppdatera ÄNNU OFTARE!!!!

