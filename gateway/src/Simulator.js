
import {get_GD_for_time, weather_change} from 'src/wind_module.js';
import {} from 'src/entities/Prosumer.js';

/* Thoughts 
    - Do we really need to instansiate the consumers. They are as static as they come for objects.
*/

class Simulator {
    /* 
    sim_time: Days, ex 60 gives values for 60 days with 24 hour values for each day.
    int_pros: Amount of prosumers in sim, ex 8 will gen 8 prosumer objects.
    int_cons: Amout of consumers in sim, ex 8 will gen 8 consumer objects.
    */
    constructor(sim_time, int_pros, int_cons) {
        this.wind_data = get_GD_for_time(sim_time); // NEEDS TO BE PUSHED TO DB
        this.prosumer_list = new Array();
        this.consumer_list = new Array();
        this.create_prosumers(int_pros); // NEEDS TO BE PUSHED TO DB
        this.create_consumers(int_cons); // NEEDS TO BE PUSHED TO DB

        // TODO: what does the simulator need to start
    }
    create_prosumers(num) {
        for (i = 0; i < num; i++) {
            var prosumer = new Prosumer(i);
            this.prosumer_list.push(prosumer);
        }
    }
    create_consumers(num) { 
        for (i = 0; i < num; i++) {
            var consumer = new consumer(); 
            this.consumer_list.push(consumer);
        }
    }
    // Steps of starting process.
    // 1- Create the wind_model and push into DB. Maybe take the sim.time as argument in the constructor?
    // ---- In what whay do we want the wind data?
    // 2- Instanciate the entitie objects.
    // 3- Set the tick rate.
    // 4- Run the update(simulation frequency) function




}