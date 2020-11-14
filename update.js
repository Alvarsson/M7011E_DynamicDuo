import {set_temp_consumption, set_consumer_demand} from './Consumer.js';
import {calc_total_consumption, set_temp_prosumption, set_pwr_to_house, set_wind_power} from './Prosumer.js';

function get_update_data() {
    // TODO: Write Mongoose data getter for the following values:
    // - temperature
    // - wind_speed
    // - Prosumer house pwr distribution
    // - 

    // mock data to test the update function
    var temp = 25;
    var wind = 5;
    var pro_pwr_dist = 0.8;

    update_states(temp, wind, pro_pwr_dist);
}

function update_states(temperature, wind_speed, pro_house_dist) {


    // Consumer
    set_temp_consumption(temperature);
    set_consumer_demand();

    // Prosumer 
    // TODO: need to loop over these for each id in prosumer.
    set_wind_power(wind_speed);
    set_pwr_to_house(pro_house_dist);
    set_temp_prosumption(temperature);
    calc_total_consumption();


     

}

