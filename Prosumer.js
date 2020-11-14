class Prosumer {
    
    constructor(id, wind_speed) {
        this.id = id;
        this.base_consumption = 20;
        this.pwr_production = this.set_wind_power(wind_speed);
        this.total_pwr_cons;
        this.temperature_consumption;

        this.wind_pwr_to_house;

        this.pwr_to_battery;
        this.pwr_from_battery;
        this.battery_level;
        this.battery_max = 200;

        this.pwr_to_house;
        this.pwr_from_house;

        this.pwr_to_market;
        this.pwr_from_market;
        //this.under_over_pwr; 
    }

//TODO: Do we only need one variable for market dist, battery dist, house dist or is it better to use two?
// - Im gonna start with two and we can change that later if so.

//TODO: Is it good to have a flag for under/over production or should we go for negative/positive house demand?
// -  Currently going for -/+ demand

//----- ID -----
    get_prosumer_id() {
        return this.id;
    }

//-----  UNDER/OVER-PRODUCTION ------ 
    /* set_under_over_pwr(bool) {
        this.under_over_pwr = bool;
    }
    get_under_over_pwr() {
        return this.under_over_pwr;
    } */

//------ BASE CONSUMPTION -------
    get_base_consumption() {
        return this.base_consumption;
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
        this.total_pwr_cons = this.get_base_consumption() + this.get_temp_consumption() - this.get_total_pwr_to_house(); 
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
        this.pwr_to_battery = this.get_wind_power() * battery_dist;
    }
    get_battery_level() {
        return this.battery_level;
    }
    get_battery_max() {
        return this.battery_max;
    }
    charge_discharge_battery(charge_discharge) { 
        if ((this.get_battery_level() + charge_discharge) > this.get_battery_max()) {
            this.battery_level = this.get_battery_max();

        } else {
            this.battery_level += charge_discharge;
        }
    }
    set_pwr_from_battery(pwr_dist) {
        this.pwr_from_battery = this.get_battery_level() * pwr_dist;
    }
    get_pwr_from_battery() {
        return this.pwr_from_battery
    }

//------ WIND TO HOUSE POWER -----
    get_wind_pwr_to_house() {
        return this.wind_pwr_to_house;
    }
    set_wind_pwr_to_house(wind_pwr_dist) {
        this.wind_pwr_to_house = this.get_wind_power() * wind_pwr_dist;;
    }

//------ TOTAL POWER TO HOUSE ------

    get_total_pwr_to_house() {
        return this.pwr_to_house;
    }
    set_total_pwr_to_house() {
        this.pwr_to_house = this.get_wind_pwr_to_house() + this.get_pwr_from_battery() + this.get_pwr_from_market();
    }


//------ POWER DISTRIBUTION ------
    pwr_to_house_distribution(bool,house, battery, market) { // assuming we send in number such as 10%, 50% etc.
        if ((house+battery+market) == 100) { // TODO: just check that combined is not over 100%
            if (this.get_total_pwr_to_house() >= this.get_total_consumption() ) { // OVER PRODUCTION
                this.set_wind_pwr_to_house(house/100);
                this.set_pwr_to_battery(battery/100);
                this.set_pwr_to_market(market/100);
            } else { // UNDER PRODUCTION
                this.set_pwr_to_house(house/100);
                this.set_pwr_from_battery(battery/100);
                this.set_pwr_from_market(market/100);
            }   
        } else {
            console.log("Can't do more that 100% of that."); // SEND SOME ERROR
        }
    }

 //------- MARKET POWER --------
    set_pwr_to_market(market_dist) {
        this.pwr_to_market = this.get_wind_power() * market_dist;
    }
    get_pwr_to_market() {
        return this.pwr_to_market;
    }
    set_pwr_from_market(market_dist) { // based on demand?
        if (get_total_consumption() > 0) {
            this.pwr_from_market = get_total_consumption() * market_dist;
        }
        
    }
    get_pwr_from_market() {
        return this.pwr_from_market;
    }
}
export {calc_total_consumption, set_temp_prosumption, set_pwr_to_house, set_wind_power};