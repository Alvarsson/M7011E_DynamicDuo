class Prosumer {
    
    constructor(id, wind_speed) {
        this.id = id;
        this.base_consumption = 20;
        this.pwr_production = this.set_wind_power(wind_speed);
        this.total_pwr_cons;
        this.battery_charge_rate;
        this.battery_level;
        this.battery_max = 200;
        this.pwr_to_house;
        this.temperature_consumption;
        this.override;
        this.market_pwr;
        this.pwr_from_battery;
    }

//----- ID -----
    get_prosumer_id() {
        return this.id;
    }

//----- WIND POWER -----
    set_wind_power(wind_speed) {
        //lets assume we get 4 pwr for each 1 m/s of wind. So 4 m/s generates 16 pwr/ hour.
        this.pwr_production = wind_speed*4;
    }
    get_wind_power() {
        return this.pwr_production;
    }

//----- CALCULATE POWER ------
    // base consumption - house allocated self-produced pwr.
    calc_total_consumption() {
        this.total_pwr_cons = this.base_consumption + this.temperature_consumption - this.pwr_to_house; 
    }
    get_total_consumption() {
        return this.total_pwr_cons;
    }
    set_temp_prosumption(temperature) {
        this.temperature_consumption = Math.abs(20 - temperature);
    }
    get_temp_consumption() {
        return this.temperature_consumption;
    }

//------ BATTERY POWER -----
    set_pwr_to_battery(battery_dist) {
        this.battery_charge_rate = this.pwr_production * battery_dist;
    }
    get_battery_level() {
        return this.battery_level;
    }
    charge_discharge_battery(charge_discharge) {
        if ((this.battery_level + charge_discharge) > this.battery_max) {
            this.battery_level = this.battery_max;

        } else {
            this.battery_level += charge_discharge;
        }
    }
    set_pwr_from_battery(pwr_dist) {
        this.pwr_from_battery = this.battey_level * pwr_dist;
    }
    get_pwr_from_battery() {
        return this.pwr_from_battery
    }

//------ HOUSE POWER -----
    get_pwr_to_house() {
        return this.pwr_to_house;
    }
    set_pwr_to_house(wind_pwr_dist) {
        this.pwr_to_house = this.pwr_production * wind_pwr_dist;;
    }


//------ POWER DISTRIBUTION ------
    // function to set distribution of power to house, to battery and to market.
    pwr_to_house_distribution(house, battery, market) { // assuming we send in number such as 10%, 50% etc.
        if ((house+battery+market) == 100) { // TODO: just check that combined is not over 100%
            this.set_pwr_to_house(house/100);
            this.set_pwr_to_battery(battery/100);
            this.set_pwr_to_market(market/100);
        } else {
            console.log("Can't do more that 100% of that."); // SEND SOME ERROR
        }
    }
    pwr_from_house_distribution(battery, market) {

    }
 //------- MARKET POWER --------
    set_pwr_to_market(market_dist) {
        this.market_pwr = this.pwr_production * market_dist;
    }
    get_pwr_to_market() {
        return this.market_pwr;
    }
    distribution_calculator() { // to calc pwr dist when we dont feel like it.

    }
}
export {calc_total_consumption, set_temp_prosumption, set_pwr_to_house, set_wind_power};