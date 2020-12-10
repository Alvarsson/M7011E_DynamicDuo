const Prosumer = require("./entities/Prosumer.js");
const Consumer = require("./entities/Consumer.js");
const Manager = require("./entities/Manager.js");
const WindModule = require("./wind_module");
const axios = require("axios");
const tick_time = 5000;


const SimController = require("./Simulation_controller");
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
    console.log("SETTING UP SIMULATOR");
    // generera wind, into DB
    console.log("Generating wind data");
    this.wm = new WindModule();
    this.generate_wind_data(); // uncomment this for deployment

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
    SimController.fillWeatherDataOnce(this.wm.tick_variation(1)); // 2 days, change for longer sims.

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
      })
      .catch(error => {
        console.log(error.response.status + " Failed to register prosumer, it probable exists or smth");
      });
  }
  push_prosumer_logs(prosumer_list, tick) {
    for (var i = 0; i < prosumer_list.length; i++) {
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

  /* updates distr in all prosumer objects */
  update_prosumer_distrs(prosumer_list) {
    for (var i = 0; i < prosumer_list.length; i++) {
      this.update_prosumer_distr(prosumer_list[i]);
    }
  }

  update_prosumer_distr(prosumer){
    axios.get(`http://rest:3001/prosumersettings/${prosumer.get_prosumer_id()}`).
      then(response => {
        prosumer.set_sell_percentage(response.data.distribution.sell);
        prosumer.set_store_percentage(response.data.distribution.store);
        prosumer.set_buy_percentage(response.data.distribution.buy);
        prosumer.set_drain_percentage(response.data.distribution.drain);
      })
        .catch(error => {
          console.log(error);
        });
  }

  get_current_wind_speed(tick){
    axios.get(`http://rest:3001/windspeed/${tick}`).
      then(response => {
        this.wind_speed = response.data.wind_speed;
      })
        .catch(error => {
          if (error.response.status == 404){
            console.log("Windspeed not found, check that you have wind data in DB");
          } else{
            console.log(error);
          }
        });
  }

  calculate_new_logs(prosumer_list){
    var i = 0;
    for(i = 0; i < prosumer_list.length; i++) {
      //prosumer_list[i].räknaUtSkiten
    }
    // PROSUMER: 
    //consumption
    //production
    //batterylvl
    //broken
    //weather
  }

  update() {

    console.log("tick at 20 seconds")
    // check if new prosumersettings added/removed LOW PRIO BOI
    
    // get updated distr + weathertick
    this.update_prosumer_distrs(this.prosumer_list);
    this.wind_speed = this.get_current_wind_speed(this.tick);
    //calculate prod/con
    //this.calculate_new_logs();
    //push to log DB for pro and man
    this.push_prosumer_logs(this.prosumer_list, this.tick++);
    // PUSH TO MANAGER HERE
    //push to blackout

    // Collection of all functions that should
    //SimController.create();
  }

  // Steps of starting process.
  // 1- Create the wind_model and push into DB. Maybe take the sim.time as argument in the constructor?
  // ---- In what whay do we want the wind data?
  // 2- Instanciate the entitie objects.
  // 3- Set the tick rate.
  // 4- Run the update(simulation frequency) function
}

module.exports = Simulation;
