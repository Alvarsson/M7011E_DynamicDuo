const fs = require('fs');
const Prosumer = require("./entities/Prosumer.js");
const Consumer = require("./entities/Consumer.js");
const Manager = require("./entities/Manager.js");
const WindModule = require("./wind_module");
const axios = require("axios");

// Get simkey
const readKey = fs.readFileSync("simkey.json");
const parseKey = JSON.parse(readKey);
const sim_key = parseKey.simKey;
axios.defaults.headers.common['sim'] = sim_key // for all requests

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
    this.wind_speed = -1;
    this.temperature = 20;
    this.last_temp_update_tick = 0;
    this.tick = 0;
    console.log("SETTING UP SIMULATOR");
    // generera wind, into DB

    this.get_current_wind_speed(0).then( () => {// called to see if there is any windspeed
      if (this.wind_speed == -1) { // means we have not generated windspeeds yet.
        console.log("Generating wind data");
        this.wm = new WindModule();
        this.generate_wind_data(sim_time);
        this.wind_speed = 5;
      }
    }); 
    
    //create prosumers, add to DB, register users
    console.log("Creating Prosumers");
    this.prosumer_list = new Array();
    this.create_prosumers(int_pros);
    console.log("Pushing prosumers to DB");
    this.register_prosumers(this.prosumer_list);

    console.log("Creating consumers");
    this.nr_of_consumers = int_cons;
    this.consumer = new Consumer(); // used to calc consumer data

    // Create Manager, add to DB, register user
    this.manager = new Manager(int_cons, int_pros);
    this.push_manager_setting();
    this.add_user("Manager");

    // REgga simulator som user?? req.headers.sim header, ska hämtas från simkey.json

    this.update_temperature(); // get current temperature
  }


  generate_wind_data(days) {
    SimController.fillWeatherDataOnce(this.wm.tick_variation(days)); // days

  }
  create_prosumers(num) {
    for (var i = 0; i < num; i++) {
      var prosumer = new Prosumer(i);
      this.prosumer_list.push(prosumer);
    }
  }

  push_manager_setting() {
    console.log("THIS IS RUNNING");
    axios.post(`http://rest:3001/api/managersettings/`, {
      id: "Manager",
      market_price: this.manager.get_pwr_price(),
      production: this.manager.get_pwr_production(),
      PP_status: this.manager.get_plant_status(),
      inc_status_change: {
        timer: this.manager.get_inc_status_change_timer(), // -1 for no incoming change
        new_status: this.manager.get_inc_status_change() // -1 doesnt match any status, thus no change
      },
      inc_prod_change: {
        timer: this.manager.get_inc_prod_change_timer(), // -1 for no incoming change
        new_prod: this.manager.get_inc_prod_change() // -1 for no change
      },
      img_url: "http://www.placecage.com/500/600",
      battery_warning_threshold: 20,
      distribution: {
        store: 0,
        sell: 1
      },
      login_credentials: {
        password: "supaSecret",
        online: 0
      }
    })
      .then(response => {
        console.log("Registered Manager");
      })
      .catch(error => {
        console.log(error.response.status + " Failed to register manager, it probable exists or smth");
      });
  }

  push_prosumer_setting(prosumer) {
    axios.post(`http://rest:3001/api/prosumersettings/`, {
      id: prosumer.get_prosumer_id(),
      img_url: "http://www.placecage.com/500/600",
      distribution: {
        sell: prosumer.get_sell_percentage(),
        store: prosumer.get_store_percentage(),
        buy: prosumer.get_buy_percentage(),
        drain: prosumer.get_drain_percentage()
      },
      blocked: 0,
      broken: 0,
      blackout: false,
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
    var promise = new Promise((resolve, reject) => {
      var promise_list = [];
      for (var i = 0; i < prosumer_list.length; i++) {
        promise_list.push(this.push_prosumer_log(prosumer_list[i], tick));
      }
      Promise.all(promise_list).then(resolve());
    });
    return promise;
  }

  push_prosumer_log(prosumer, tick) {
    var promise = new Promise((resolve, reject) => {
      axios.post(`http://rest:3001/api/prosumerlog/`, {
        id: prosumer.get_prosumer_id(),
        consumption: prosumer.get_total_consumption(),
        production: prosumer.get_production(),
        net_production: prosumer.get_net_production(),
        tick: tick,
        battery_level: prosumer.get_battery_level(),
        broken: prosumer.get_broken(),
        weather: {
          wind_speed: prosumer.get_wind_speed(),
          temperature: prosumer.get_temperature()
        }
      }).then(response => {
        console.log("pushed log for prosumer");
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }

  push_manager_logs(manager) {
    var promise = new Promise((resolve, reject) => {
      var payload = {
        PP_status: manager.get_plant_status(),
        recommended_market_price: manager.get_company_price_rec(),
        market_price: manager.get_pwr_price(),
        battery_level: manager.get_buffer_level(),
        production: manager.get_pwr_production(),
        tick: this.tick,
        market_demand: manager.get_market_demand(),
        power_plant_consumption: 0, // TODO, or ignore it?
        nr_of_consumers: this.nr_of_consumers
      }
      axios.post(`http://rest:3001/api/managerlog/`,  payload).then(response => {
        console.log("pushed log for manager");
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }

  add_user(id) {
    axios.post(`http://rest:3001/api/register/`,  {
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

  update_block_timers(prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      var promise_list = [];
      for (var i = 0; i < prosumer_list.length; i++) {
        promise_list.push(this.update_block_timer(prosumer_list[i]));
      }
      Promise.all(promise_list).then(resolve());
    });
    return promise;
  }

  update_break_timers(prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      var promise_list = [];
      for (var i = 0; i < prosumer_list.length; i++) {
        promise_list.push(this.update_break_timer(prosumer_list[i]));
      }
      Promise.all(promise_list).then(resolve());
    });
    return promise;
  }

  update_blackouts(prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      var promise_list = [];
      for (var i = 0; i < prosumer_list.length; i++) {
        promise_list.push(this.update_blackout(prosumer_list[i]));
      }
      Promise.all(promise_list).then(resolve());
    });
    return promise;
  }

  update_blackout(prosumer) {
    axios.put(`http://rest:3001/api/prosumersettings/${prosumer.get_prosumer_id()}/blackout`,  {
      blackout: prosumer.get_blackout()
    }).then(response => {
    })
      .catch(error => {
        console.log(error);
      });
  }

  update_block_timer(prosumer) {
    axios.put(`http://rest:3001/api/prosumersettings/${prosumer.get_prosumer_id()}/block`,  {
      blocked: prosumer.get_blocked()
    }).then(response => {
    })
      .catch(error => {
        console.log(error);
      });
  }

  update_break_timer(prosumer) {
    axios.put(`http://rest:3001/api/prosumersettings/${prosumer.get_prosumer_id()}/broken`,  {
      broken: prosumer.get_broken()
    }).then(response => {
    })
      .catch(error => {
        console.log(error)
      });
  }
  update_inc_status_change(manager) {
    var promise = new Promise((resolve, reject) => {
      axios.put(`http://rest:3001/api/managersettings/inc_status_change`,  {
        inc_status_change: {
          timer: manager.get_inc_status_change_timer(),
          new_status: manager.get_inc_status_change()
        }
      }).then(response => {
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }

  update_manager_production(manager) {
    var promise = new Promise((resolve, reject) => {
      axios.put(`http://rest:3001/api/managersettings/production`,  {
        production: manager.get_pwr_production()
      }).then(response => {
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }

  update_manager_pp_status(manager) {
    var promise = new Promise((resolve, reject) => {
      axios.put(`http://rest:3001/api/managersettings/pp_status`,  {
        PP_status: manager.get_plant_status()
      }).then(response => {
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }


  update_inc_prod_change(manager) {
    var promise = new Promise((resolve, reject) => {
      axios.put(`http://rest:3001/api/managersettings/inc_prod_change`,  {
        inc_prod_change: {
          timer: manager.get_inc_prod_change_timer(),
          new_prod: manager.get_inc_prod_change()
        }
      }).then(response => {
        resolve();
      })
        .catch(error => {
          reject();
          console.log(error);
        });
    });
    return promise;
  }

  /* updates distr in all prosumer objects */
  update_prosumers_data(prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      console.log("updating prosumer data");
      var promise_list = [];
      for (var i = 0; i < prosumer_list.length; i++) {
        promise_list.push(this.update_prosumer_data(prosumer_list[i]));
      }
      Promise.all(promise_list).then(resolve());
    });
    return promise;
  }

  update_prosumer_data(prosumer) {
    var promise = new Promise((resolve, reject) => {
      axios.get(`http://rest:3001/api/prosumersettings/${prosumer.get_prosumer_id()}`).
        then(response => {
          prosumer.set_sell_percentage(response.data.distribution.sell);
          prosumer.set_store_percentage(response.data.distribution.store);
          prosumer.set_buy_percentage(response.data.distribution.buy);
          prosumer.set_drain_percentage(response.data.distribution.drain);
          prosumer.set_blocked(response.data.blocked);
          prosumer.set_broken(response.data.broken);
          resolve();
        })
        .catch(error => {
          console.log("ärror");
          console.log(error);
          reject(error);
          if (error.response.status == 404) {
            console.log("404: Unable to find prosumersettings for", prosumer.get_prosumer_id());
          } else {
            console.log("undefined error", error);
          }
        });
    });
    return promise;
  }

  update_manager_data(manager) {
    var promise = new Promise((resolve, reject) => {
      axios.get(`http://rest:3001/api/managersettings/`).
        then(response => {
          /* handle inc status%prod */
          manager.set_plant_distribution(response.data.distribution.store, response.data.distribution.sell);
          manager.set_plant_status(response.data.PP_status);
          manager.set_pwr_price(response.data.market_price);
          manager.set_pwr_production(response.data.production);
          manager.set_inc_status_change(response.data.inc_status_change.timer, response.data.inc_status_change.new_status);
          manager.set_inc_prod_change(response.data.inc_prod_change.timer, response.data.inc_prod_change.new_prod);
          console.log("i got dis prod from rest:", response.data.production);
          resolve();
        })
        .catch(error => {
          console.log("ärror");
          reject(error);
          if (error.response.status == 404) {
            console.log("404: Unable to find managersettings");
          } else {
            console.log("undefined error", error);
          }
        });
    });
    return promise;
  }


  get_current_wind_speed(tick) {
    var promise = new Promise((resolve, reject) => {
      axios.get(`http://rest:3001/api/windspeed/${tick}`).
        then(response => {
          this.wind_speed = Math.abs(response.data.wind_speed);
          resolve();
        })
        .catch(error => {
          reject();
          if (error.response.status == 404) {
            console.log("Windspeed not found, check that you have wind data in DB");
          } else {
            console.log(error);
          }
        });
    });
    return promise;
  }

  calculate_new_prosumer_logs(prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      var i = 0;
      for (i = 0; i < prosumer_list.length; i++) {
        prosumer_list[i].set_wind_speed(this.wind_speed);
        prosumer_list[i].set_temperature(this.temperature);
        prosumer_list[i].recalc();
      }
      resolve();
    });
    return promise;
  }
  calculate_new_manager_state(manager) {
    var promise = new Promise((resolve, reject) => {
      manager.set_nr_prosumers(this.prosumer_list.length);
      manager.set_market_demand(this.get_total_demand());
      manager.recalc();

      resolve();
    });
    return promise;
  }

  get_total_demand() { // WARNING: Handle this if it is negative (prosumers are providing for more than whole net. Add to manager buffer?)
    var result = 0;
    result += this.nr_of_consumers * this.consumer.get_consumer_demand();
    for (var i = 0; i < this.prosumer_list.length; i++) {
      result += Math.abs(this.prosumer_list[i].get_pwr_from_market()); // remove prosumer buying
      result -= this.prosumer_list[i].get_pwr_to_market(); // add prosumer selling
    }
    return result;
  }

  prosumer_exists(id, prosumer_list) {
    for (var i = 0; i < prosumer_list.length; i++) {
      if (id == prosumer_list[i].get_prosumer_id()) {
        return true;
      }
    }
    return false;
  }

  /* This function will check if any prosumers have been added/removed.
  It does so by matching the simulators prosumer_list with prosumerSettings.
  Will add/delete any prosumers not matched. */
  update_prosumer_list() {
    var promise = new Promise((resolve, reject) => {
      axios.get(`http://rest:3001/api/prosumersettings`).
        then(response => {
          // TODO: Should be able to optimize this with a combined loop
          // Check for new prosumers
          for (var i = 0; i < response.data.length; i++) {
            if (!this.prosumer_exists(response.data[i].id, this.prosumer_list)) {
              this.prosumer_list.push(new Prosumer(response.data[i].id));
            }
          }
          // Check for deleted prosumers
          var new_list = new Array();
          for (var i = 0; i < this.prosumer_list.length; i++) {
            for (var j = 0; j < response.data.length; j++) {
              if (this.prosumer_list[i].get_prosumer_id() == response.data[j].id) {
                new_list.push(this.prosumer_list[i]);
                break;
              }
            }
          }
          this.prosumer_list = new_list;
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });
    return promise;
  }

  get_nr_of_blackout_consumers(pwr_missing) {
    var consumer_demand = this.consumer.get_consumer_demand();
    // black out consumers:
    return Math.ceil(pwr_missing / consumer_demand);
  }

  blackout_prosumers(pwr_missing, prosumer_list) {
    var list = [];
    for (var i = 0; i < prosumer_list.length; i++) {
      list.push(prosumer_list[i]); // add prosumer to blocked
      pwr_missing -= prosumer_list[i].get_pwr_from_market();
      if (pwr_missing <= 0) {
        break;
      }
    }
    return list;
  }

  push_blackout_consumers(num) {
    axios.post(`http://rest:3001/api/blackouts`,  {
      id: "consumer",
      tick: this.tick,
      amount: num
    }).then(response => {
    })
      .catch(error => {
        console.log(error);
      });
  }
  push_blackout_prosumer(id) {
    axios.post(`http://rest:3001/api/blackouts`,  {
      id: id,
      tick: this.tick,
      amount: 1
    }).then(response => {
    })
      .catch(error => {
        console.log(error);
      });
  }
  /* This method will calculate who (if any) gets a blackout
     Consumers always blackout before prosumers
     This method also pushes the results to blackoutDB as well as updates status for prosumers */
  blackout_check_push(nr_of_consumers, consumer, manager, prosumer_list) {
    var promise = new Promise((resolve, reject) => {
      // reset blackout status for all prosumers
      for (var i = 0; i < prosumer_list.length; i++) {
        prosumer_list[i].set_blackout(false);
      }
      // Calculate who gets BO
      var pwr_missing = manager.get_pwr_missing();
      var blackout_prosumer_list = [];
      var nr_of_blocked_consumers = this.get_nr_of_blackout_consumers(pwr_missing);

      pwr_missing -= nr_of_consumers * consumer.get_consumer_demand();
      if (nr_of_blocked_consumers > nr_of_consumers) { // prosumers will be affected
        pwr_missing -= consumer.get_consumer_demand() * nr_of_consumers;
        blackout_prosumer_list = this.blackout_prosumers(pwr_missing, prosumer_list);
      }
      //push to logs
      if (nr_of_blocked_consumers > 0) {
        this.push_blackout_consumers(nr_of_blocked_consumers);
      }
      // push to logs, update state
      for (var i = 0; i < blackout_prosumer_list.length; i++) {
        this.push_blackout_prosumer(blackout_prosumer_list[i].get_prosumer_id());
        blackout_prosumer_list[i].set_blackout(true);
      }
      resolve();
    });
    return promise;
  }
  // Updates temperature from SMHI.
  update_temperature() {
    axios.get(`https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/162860/period/latest-hour/data.json`).
      then(response => {
        try {
          console.log("SMHI temp updated:", response.data.value[0].value);
          this.temperature = response.data.value[0].value;
          this.last_temp_update_tick = this.tick;
          this.consumer.set_temperature(this.temperature);
        } catch (error) {
          console.log("SMHI value probably empty, retrying next tick");
        }
      })
      .catch(error => {
        console.log("Something went wrong at SMHI API, keeping the last data.");
        reject();
      });
  }

  update() {
    console.log("tick ", this.tick);

    // Get new weather data
    if (this.tick - this.last_temp_update_tick >= 360) {
      this.update_temperature();
    }

    this.update_prosumer_list(this.prosumer_list).then(() => {
      this.update_prosumers_data(this.prosumer_list).then(() => {
        this.update_manager_data(this.manager).then(() => {
          this.get_current_wind_speed(this.tick).then(() => {
            this.calculate_new_prosumer_logs(this.prosumer_list).then(() => {
              this.calculate_new_manager_state(this.manager).then(() => {
                this.blackout_check_push(this.nr_of_consumers, this.consumer, this.manager, this.prosumer_list).then(() => {
                  this.push_prosumer_logs(this.prosumer_list, this.tick).then(() => {
                    this.push_manager_logs(this.manager).then(() => {
                      this.update_block_timers(this.prosumer_list).then(() => {
                        this.update_break_timers(this.prosumer_list).then(() => {
                          this.update_blackouts(this.prosumer_list).then(() => {
                            this.update_inc_prod_change(this.manager).then(() => {
                              this.update_inc_status_change(this.manager).then(() => {
                                this.update_manager_production(this.manager).then( () => {
                                  this.update_manager_pp_status(this.manager).then( () => {
                                    console.log("Finished update for tick", this.tick++);
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}

module.exports = Simulation;
