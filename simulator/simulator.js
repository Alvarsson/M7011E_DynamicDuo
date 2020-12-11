/* This file starts the simulation */

const mongoose = require("mongoose");
const db = require("./src/models");
const Simulation = require("./src/Simulation");


const days = 60;
const nrOfProsumers = 2;
const nrOfconsumers = 44;





const simulator = new Simulation(
  days,
  nrOfProsumers,
  nrOfconsumers
);

console.log("är detta starten?");
// START OF MAIN LOOP KAN JU INTE SE UT SÅHÄR GAHA
// simulator.generate_wind_data();

setInterval(simulator.update.bind(simulator), 10000); // Javascript är bullshit och fejkar att de har klasser men de är bitches och har egentligen inte klasser. Dvs.. man måste skriva .bind efter funktionen för att den ska förstå att "this" existerar för att javascript är ett skitspråk.

//setInterval(simulator.update, 5000); //man kanske kan göra en callback till sig själv och uppdatera ÄNNU OFTARE!!!!

//while(true);