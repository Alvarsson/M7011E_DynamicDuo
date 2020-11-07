//What consumes electricity?:
// - Consumers
// - Prosumers (potentially)
// - Power-plant (maybe?)

// this is much better as classes i know but this is just brain using and putting into code moment yo.

// Consumer power consumption depends on temperature
function get_con_consumption(temperature) {
    return temp_multiplier(temperature);
}

// Prosumer power consumption depends on temperature and self-produced power allocated to the house.
// The self-produced power depends on windspeed 
function get_pro_consumption(temperature) {
    
}
function pro_wind_power(wind_speed) {
    //lets assume we get 4 pwr for each 1 m/s of wind. So 4 m/s generates 16 pwr/ hour.
    return wind_speed*4;
}

function temp_multiplier(temperature) {
    var house_base = 20; // pulled outa da ass 20pwr /hour
    var diff = Math.abs( 20 - temperature); //abs, warming and cooling house.
    var multiplier = diff/10;
    return house_base * multiplier;
}