const Prosumer = require("./entities/Prosumer.js");
const Consumer = require("./entities/Consumer.js");
const Manager = require("./entities/Manager.js");
const WindModule = require("./wind_module");
const axios = require("axios");


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
    this.wind_speed = 5;
    this.temperature = 20;
    this.tick = 0;
    console.log("SETTING UP SIMULATOR");
    // generera wind, into DB
    console.log("Generating wind data");
    this.wm = new WindModule();
    //this.generate_wind_data(); // uncomment this for deployment

    // create prosumers, add to DB, register users
    console.log("Creating Prosumers");
    this.prosumer_list = new Array();
    this.create_prosumers(int_pros);
    console.log("Pushing prosumers to DB");
    this.register_prosumers(this.prosumer_list);

    console.log("Creating consumers");
    this.nr_of_consumers = int_cons;
    this.consumer = new Consumer(); // used to calc consumer data

    // Create Manager, add to DB, register user
    this.manager = new Manager();
    this.push_manager_setting();
    this.add_user("Manager");
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

  push_manager_setting(manager){
    axios.post(`http://rest:3001/prosumersettings/`, {
      id: "Manager",
      img_url: "http://www.placecage.com/500/600",
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
        production: prosumer_list[i].get_production(),
        tick: tick,
        battery_level: prosumer_list[i].get_battery_level(),
        broken_turbine: prosumer_list[i].get_turbine_broken(),
        weather: {
          wind_speed: prosumer_list[i].get_wind_speed(),
          temperature: prosumer_list[i].get_temperature()
        }
      }).then(response => {
        console.log("pushed log for prosumer");
      })
        .catch(error => {
          console.log(error);
        });

    }
  }

  push_manager_logs(manager) {
    axios.post(`http://rest:3001/managerlog/`, {
        market_price: manager.get_pwr_price(),
        battery_level: manager.get_buffer_level(),
        production: manager.get_pwr_production(),
        tick: this.tick,
        total_net_consumption: manager.get_market_demand(),
        power_plant_consumption: 0, // TODO?
        nr_of_consumers: this.nr_of_consumers
      }).then(response => {
        console.log("pushed log for prosumer");
      })
        .catch(error => {
          console.log(error);
        });
  }

  add_user(id){
    axios.post(`http://rest:3001/register/`, {
        id: id,
        password: "supaSecret"
      }).then(response => {
        console.log("added user ", id);
      })
        .catch(error => {
          console.log("Failed to register user, reason: ", error.response.data);
        });
  }

  register_prosumers(prosumer_list) {
    for (var i = 0; i < prosumer_list.length; i++) {
      this.add_user(prosumer_list[i].get_prosumer_id());
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
          if(error.response.status == 404){
            console.log("404: Unable to find prosumersettings for", prosumer.get_prosumer_id());
          } else {
            console.log(error);
          }
          
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

  calculate_new_prosumer_logs(prosumer_list){
    var i = 0;
    for(i = 0; i < prosumer_list.length; i++) {
      prosumer_list[i].set_wind_speed(this.wind_speed);
      prosumer_list[i].set_temperature(this.temperature);
      prosumer_list[i].recalc();
    }// TODO: borken, blocked
  }
  calculate_new_manager_logs(manager){
    manager.set_market_demand(this.get_total_demand());
    //TODO: finish these
  }

  get_total_demand(){
    var result = 0;
    result += this.nr_of_consumers*this.consumer.get_consumer_demand();
    for(var i = 0; i < this.prosumer_list.length; i++){
      result += this.prosumer_list[i].get_pwr_from_market();
    }
    return result;
  }

  prosumer_exists(id, prosumer_list){
    for(var i = 0; i < prosumer_list.length; i++){
      if(id == prosumer_list[i].get_prosumer_id()){
        return true;
      }
    }
    return false;
  }

  /* This function will check if any prosumers have been added/removed.
  It does so by matching the simulators prosumer_list with prosumerSettings.
  Will add/delete any prosumers not matched. */
  update_prosumer_list(){
    axios.get(`http://rest:3001/prosumersettings`).
      then(response => {
        // TODO: Should be able to optimize this with a combined loop
        // Check for new prosumers
        for(var i = 0; i < response.data.length; i++){
          if(!this.prosumer_exists(response.data[i].id, this.prosumer_list)){
            this.prosumer_list.push(new Prosumer(response.data[i].id)); 
          }
        }
        // Check for deleted prosumers
        var new_list = new Array();
        for(var i = 0; i < this.prosumer_list.length; i++){
          for(var j = 0; j < response.data.length; j++){
            if(this.prosumer_list[i].get_prosumer_id() == response.data[j].id){
              new_list.push(this.prosumer_list[i]);
              break;
            }
          }
        }
        this.prosumer_list = new_list;
      })
        .catch(error => {
          console.log(error);
        });
  }

  update() {

    console.log("tick at 10 seconds")
    // check if new prosumersettings added/removed
    this.update_prosumer_list(this.prosumer_list);
    // get updated distr + weathertick
    this.update_prosumer_distrs(this.prosumer_list);
    this.get_current_wind_speed(this.tick);
    //calculate prod/con
    this.calculate_new_prosumer_logs(this.prosumer_list);
    //push to log DB for pro and man
    this.push_prosumer_logs(this.prosumer_list, this.tick++);
    // TODO: re-calculate values for manager.
    this.calculate_new_manager_logs(this.manager);
    // PUSH logs to manager
    this.push_manager_logs(this.manager);
    //TODO:push to blackout

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
