class Prosumer {
    constructor(id) {
        this.id = id;
        this.base_consumption = 20;
        this.pwr_production = 20;
        this.total_pwr_cons = 20;
        this.temperature_consumption = 0; // needed?

        //initial distribution
        this.store_percentage = 0.5;
        this.sell_percentage = 0.5;
        this.buy_percentage = 0.5;
        this.drain_percentage = 0.5,

        // weather
        this.wind_speed = 5;
        this.temperature = 20;

        this.wind_pwr_to_house;

        this.store_to_battery; // STORE amount/tick
        this.drain_from_battery; // DRAIN amount/tick
        this.battery_level = 0;
        this.battery_max = 200;
        this.sell_excess = 0;
        this.low_battery;

        this.pwr_to_house; 
        this.pwr_from_house;

        this.sell_to_market; // SELL amount/tick
        this.buy_from_market; // BUY amount/tick

        this.tick_count_mngr = 0;
        this.pwr_blocked = false;
        this.return_state = []; // used to store distr while blocked/broken

        this.tick_count_turbine = 0;
        this.turbine_broken = false;
    }

// TODO: Write object inital pwr dist.
// TODO: Rewrite the wind_speed gen to get all values for tick rate.

//----- ID -----
    get_prosumer_id() {
        return this.id;
    }

// ---- weather ----
    get_wind_speed(){
        return this.wind_speed;
    }
    get_temperature(){
        return this.temperature;
    }

//------- TICK COUNTER ------
    set_pwr_block(bool) { // if true the block is on
        this.pwr_blocked = bool;
    }
    get_pwr_block() {
        return this.pwr_blocked;
    }
    tick_counter_mngr_block(ticks) { 
        this.set_pwr_block(true); // set as blocked
        this.return_state.push(get_pwr_to_battery(), get_pwr_to_market());
        if (this.tick_count_mngr < ticks) {
            this.tick_count_mngr += 1;
        }
        else {
            this.tick_count_mngr = 0;
            this.set_pwr_block(false); // unblock selling to market
            this.set_store_to_battery(this.return_state[0]);
            this.set_sell_to_market(this.return_state[1]);
        }
    }
    tick_counter_turbine() {
        this.set_turbine_broken(true); // set at broken 
        if (this.tick_count_turbine < 6) { // 2 days in 10 second ticks is 17280. For testing set 2 min = 12
            this.tick_count_turbine += 1;
        }
        else {
            this.tick_count_turbine = 0;
            this.set_turbine_broken(false); // fixed turbine.
        }
    }

//------ BASE CONSUMPTION -------
    get_base_consumption() {
        return this.base_consumption;
    }

//----- WIND POWER -----
    set_wind_power(wind_speed) {
        //lets assume we get 4 pwr for each 1 m/s of wind. So 4 m/s generates 16 pwr/ hour.
        if (this.get_turbine_broken() == true) {
            this.pwr_production = 0;
        }
        else { 
            this.pwr_production = wind_speed*4;
        }
    }
    get_wind_power() {
        return this.pwr_production;
    }
    set_turbine_broken(bool) {
        this.turbine_broken = bool;
    }
    get_turbine_broken() {
        return this.turbine_broken;
    }
    turbine_break_probability() { // called each tick
        var break_chance = 0.00115741 // 10 % break chance per day, 0.0005787 for 5%, 0.00011574 for 1 %
        if (Math.random() <= break_chance) {
            this.tick_counter_turbine();
        }
    }

//----- CALCULATE POWER ------
    // base consumption - house allocated self-produced pwr.
    warning_low_battery() {
        if ((this.get_battery_level()/this.get_battery_max()) < 0.2) {
            this.low_battery = true;
        } else {
            this.low_battery = false;
        }
    }
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
    set_excess_pwr(pwr) {
        this.sell_excess = pwr;
    }
    get_excess_pwr() {
        return this.sell_excess;
    }
    set_store_to_battery(store, pwr_left) { // gives the amount
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
    charge_battery() {
        if ((this.get_battery_level() + this.get_pwr_to_battery()) > this.get_battery_max()) {
            var diff = this.get_pwr_to_battery() - (this.get_battery_max() - this.get_battery_level());
            this.set_excess_pwr(diff);
            this.set_battery_level(this.get_battery_max());
        }
        else {
            this.battery_level += this.get_pwr_to_battery();
        }
    }
    discharge_battery() {
        if ((this.get_battery_level() - this.get_pwr_from_battery()) < 0 ) {
            this.set_battery_level(0);
        } 
        else {
            this.battery_level += this.get_pwr_from_battery();
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
        if (this.get_pwr_block()) {
            var pwr_left = this.get_wind_power() - this.get_total_consumption();
            this.set_wind_pwr_to_house(this.get_wind_power() - pwr_left);
            this.set_store_to_battery(1, pwr_left);
            this.set_sell_to_market(0, pwr_left)
        }
        else {
            var pwr_left = this.get_wind_power() - this.get_total_consumption();
            this.set_wind_pwr_to_house(this.get_wind_power() - pwr_left);
            this.set_store_to_battery(store, pwr_left);
            this.set_sell_to_market(sell, pwr_left);
        }
    }
        
    pwr_dist_under(drain, buy) {
        if (drain + buy == 1) {
            var demand_left = this.get_total_consumption() - this.get_wind_power();
            this.set_wind_pwr_to_house(this.get_wind_power());
            this.set_drain_from_battery(drain, demand_left);
            this.set_buy_from_market(buy, demand_left);
        }
    }

 //------- MARKET POWER --------
    set_sell_to_market(sell, pwr_left) {
        if (this.get_excess_pwr() > 0) {
            this.sell_to_market = pwr_left * sell + this.get_excess_pwr;
            this.set_excess_pwr(0);
        }
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

    get_sell_percentage(){
        return this.sell_percentage;
    }
    get_store_percentage(){
        return this.store_percentage;
    }
    get_buy_percentage(){
        return this.buy_percentage;
    }
    get_drain_percentage(){
        return this.drain_percentage;
    }
}
module.exports = Prosumer;
