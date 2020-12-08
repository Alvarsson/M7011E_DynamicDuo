const Prosumer = require("./entities/Prosumer.js");
const Consumer = require("./entities/Consumer.js");
const Manager = require("./entities/Manager.js");
const WindModule = require("./wind_module");
const axios = require("axios");
const tick_time = 5000;

const testModel = require("./testController");
const { set } = require("mongoose");

/* Thoughts 
    - Do we really need to instansiate the consumers. They are as static as they come for objects.
*/

class Simulation {
  /** 
    sim_time: Days, ex 60 gives values for 60 days with 24 hour values for each day.
    int_pros: Amount of prosumers in sim, ex 8 will gen 8 prosumer objects.
    int_cons: Amout of consumers in sim, ex 8 will gen 8 consumer objects.
    */
  constructor(sim_time, int_pros, int_cons) {
    this.tick = 0;
    console.log("CONSTRUCTOR");
    // generera wind, into DB
    console.log("Generating wind data");
    this.wm = new WindModule();
    // this.generate_wind_data(); // uncomment this for deployment

    // create prosumers, add to DB
    console.log("Creating Prosumers");
    this.prosumer_list = new Array();
    this.create_prosumers(int_pros);
    console.log("Pushing prosumers to DB");
    this.register_prosumers(this.prosumer_list);

 
    console.log("Creating consumers");
    this.nr_of_consumers = int_cons;
    this.consumer = new Consumer(); // used to calc consumer data

  }


  generate_wind_data() {
    testModel.fillWeatherDataOnce(this.wm.tick_variation(2)); // 2 days, change for longer sims.

  }
  create_prosumers(num) {
    for (var i = 0; i < num; i++) {
      var prosumer = new Prosumer(i);
      this.prosumer_list.push(prosumer);
    }
  }
  create_consumers(num) {
    for (var i = 0; i < num; i++) {
      var consumer = new Consumer();
      this.consumer_list.push(consumer);
    }
  }
  iterate_consumer(list) {
    for (var i = 0; i < list.length; i++) {
      list[i].set_consumer_demand();
    }
  }
  iterate_prosumer(list) {
    for (var i = 0; i < list.length; i++) {
      list[i].set_wind_power(4);
      list[i].calc_total_consumption();
      //list[i].
      //list[i].
    }
  }

  push_prosumer_setting(prosumer) {
    axios.post(`http://rest:3001/prosumersettings/`, {
      id: prosumer.get_prosumer_id(),
      img_url: "http://www.placecage.com/500/600",
      distribution: {
        sell: prosumer.get_sell_percentage(),
        store: prosumer.get_store_percentage(),
        buy: prosumer.get_buy_percentage(),
        drain: prosumer.get_drain_percentage()
      },
      battery_warning_threshold: 20,
      login_credentials: {
        password: "supaSecret",
        online: 0
      }
    })
      .then(response => {
        console.log("Registered prosumer: " + prosumer.get_prosumer_id());
        //console.log(response.data);
        //console.log(response.data.explanation);
      })
      .catch(error => {
        console.log(error.response.status + " Failed to register prosumer, it probable exists or smth");
        //console.log(error);
      });
  }
  push_prosumer_logs(prosumer_list, tick) {
    for (var i = 0; i < prosumer_list.length; i++) {
      console.log("BATTERYIIIlvl",prosumer_list[i].get_battery_level());
      axios.post(`http://rest:3001/prosumerlog/`, {
        id: prosumer_list[i].get_prosumer_id(),
        consumption: prosumer_list[i].get_total_consumption(),
        production: prosumer_list[i].get_wind_power(),
        tick: tick,
        battery_level: prosumer_list[i].get_battery_level(),
        broken_turbine: prosumer_list[i].get_turbine_broken(),
        weather: {
          wind_speed: prosumer_list[i].get_wind_speed(),
          temperature: prosumer_list[i].get_temperature()
        }
      }).then(response => {
        //console.log("Logged prosumer: " + prosumer_list[i].get_prosumer_id());
        console.log("GREAT SUCCESS");
        //console.log(response.data.explanation);
      })
        .catch(error => {
          console.log(error);
        });

    }
  }

  register_prosumers(prosumer_list) {
    for (var i = 0; i < prosumer_list.length; i++) {
      this.push_prosumer_setting(prosumer_list[i]);
    }
  }

  update() {
    // get updated distr + weathertick
    //calculate prod/con
    //push to log DB for pro and man
    //push to blackout
    this.push_prosumer_logs(this.prosumer_list, this.tick);
    this.tick++;
    // Collection of all functions that should
    //testModel.create();
    console.log("tick at 5 seconds")
  }

  // Steps of starting process.
  // 1- Create the wind_model and push into DB. Maybe take the sim.time as argument in the constructor?
  // ---- In what whay do we want the wind data?
  // 2- Instanciate the entitie objects.
  // 3- Set the tick rate.
  // 4- Run the update(simulation frequency) function
}

module.exports = Simulation;
