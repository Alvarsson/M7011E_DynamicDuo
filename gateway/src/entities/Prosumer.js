class Prosumer {
    
    constructor(id) {
        this.id = id;
        this.base_consumption = 20;
        this.pwr_production;
        this.total_pwr_cons;
        this.temperature_consumption;

        this.wind_pwr_to_house;

        this.store_to_battery; // STORE amount/tick
        this.drain_from_battery; // DRAIN amount/tick
        this.battery_level;
        this.battery_max = 200;

        this.pwr_to_house; 
        this.pwr_from_house;

        this.sell_to_market; // SELL amount/tick
        this.buy_from_market; // BUY amount/tick

        this.turbine_status;
    }

//TODO: REDO the distribution functions. As Buy and Sell functions
// - Im gonna start with two and we can change that later if so.

// TODO: Write warning function for low battery.
// TODO: Write functionality for broken wind turbine.

//----- ID -----
    get_prosumer_id() {
        return this.id;
    }

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
        this.total_pwr_cons = this.get_base_consumption() + this.get_temp_consumption(); 
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
    set_store_to_battery(store, pwr_left) {
        this.store_to_battery = pwr_left * store;
    }
    get_pwr_to_battery() {
        return this.store_to_battery;
    }
    set_battery_level(amount) {
        this.battery_level = amount;
    }
    get_battery_level() {
        return this.battery_level;
    }
    get_battery_max() {
        return this.battery_max;
    }
    charge_discharge_battery(charge_discharge) { 
        if ((this.get_battery_level() + charge_discharge) > this.get_battery_max()) {
            this.set_battery_level(this.get_battery_max());
        } else if ((this.get_battery_level() + charge_discharge) < 0){
            this.set_battery_level(0);
            this.set_buy_from_market()
        } else {
            this.battery_level += charge_discharge;
        }
    }
    set_drain_from_battery(drain, demand_left) {
        this.drain_from_battery = demand_left * drain;
    }
    get_pwr_from_battery() {
        return this.drain_from_battery
    }

//------ WIND TO HOUSE POWER -----
    get_wind_pwr_to_house() {
        return this.wind_pwr_to_house;
    }
    set_wind_pwr_to_house(pwr_amount) {
        this.wind_pwr_to_house = pwr_amount;
    }

//------ TOTAL POWER TO HOUSE ------
    get_total_pwr_to_house() {
        return this.pwr_to_house;
    }
    set_total_pwr_to_house() {
        this.pwr_to_house = this.get_wind_pwr_to_house() + this.get_pwr_from_battery() + this.get_pwr_from_market();
    }


//------ POWER DISTRIBUTION ------
    pwr_dist_over(store, sell) { // OVER PROD
        if(store + sell == 1) {
            pwr_left = this.get_wind_power() - this.get_total_consumption();
            this.set_wind_pwr_to_house(pwr_left);
            this.set_store_to_battery(store, pwr_left);
            this.set_sell_to_market(sell, pwr_left);
        }
        else {
            //Throw exception or simply console.err?
        }
    }
    pwr_dist_under(drain, buy) {
        if (drain + buy == 1) {
            demand_left = this.get_total_consumption() - this.get_wind_power();
            this.set_wind_pwr_to_house(this.get_wind_power());
            this.set_drain_from_battery(drain, demand_left);
            this.set_buy_from_market(buy, demand_left);
        }
    }

 //------- MARKET POWER --------
    set_sell_to_market(sell, pwr_left) {
        this.sell_to_market = pwr_left * sell;
    }
    get_pwr_to_market() {
        return this.sell_to_market;
    }
    set_buy_from_market(buy, demand_left) { // based on demand?
            this.buy_from_market = demand_left * buy;
    }
    get_pwr_from_market() {
        return this.buy_from_market;
    }
}
//var pros = new Prosumer(0);


/* module.exports = {get_prosumer_id,
        get_base_consumption,
        set_wind_power,
        get_wind_power,
        calc_total_consumption,
        get_total_consumption,
        set_temp_prosumption,
        get_temp_consumption,
        set_store_to_battery,
        get_pwr_to_battery,
        set_battery_level,
        get_battery_level,
        get_battery_max,
        charge_discharge_battery,
        set_drain_from_battery,
        get_pwr_from_battery,
        get_wind_pwr_to_house,
        set_wind_pwr_to_house,
        get_total_pwr_to_house,
        set_total_pwr_to_house,
        pwr_dist_over,
        pwr_dist_under,
        set_sell_to_market,
        get_pwr_to_market,
        set_buy_from_market,
        get_pwr_from_market
        }; */