class Prosumer {
    constructor(id) {
        this.id = id;
        this.base_consumption = 20;
        this.pwr_production = 20;
        this.temperature_consumption = 0;
        this.total_consumption = 20;
        this.net_prod = 0;

        //initial distribution
        this.store_percentage = 0.5;
        this.sell_percentage = 0.5;
        this.buy_percentage = 0.5;
        this.drain_percentage = 0.5;

        // weather
        this.wind_speed = 5;
        this.temperature = 20;

        this.battery_level = 0;
        this.battery_max = 200;

        this.sell_to_market = 0; // SELL amount/tick
        this.buy_from_market = 0; // BUY amount/tick

        this.blocked = 0;
        this.broken = 0;
        this.blackout = false;

        this.return_state = []; // used to store distr while blocked/broken
    }

    /* This here function will re-calculate errythang in the correct fucking order, i hope */
    recalc(){
        if(this.broken == 0){ // If not already broken, chance to break turbine
            this.turbine_break();
        }
        this.calc_all_consumptions();
        this.calc_production();
        this.net_prod = this.get_production() - this.get_total_consumption();
        var batterychange = this.update_battery_level();
        if (batterychange <=0){ // under, we buying
            this.buy_from_market = this.pwr_production - this.total_consumption - batterychange;
            this.sell_to_market = 0;
        } else if (this.blocked > 0){ // over, and blocked
            this.sell_to_market = 0;
            this.buy_from_market = 0;
        } else { // over and we are selling
            this.sell_to_market = this.pwr_production - this.total_consumption - batterychange;
            this.buy_from_market = 0;
        }
        // after all calculations are done, decrease blocked & broken tick.
        this.set_blocked(this.get_blocked() - 1);
        this.set_broken(this.get_broken() -1); 

    }

// ----- ID -----
    get_prosumer_id() {
        return this.id;
    }

// ----- Buying/Selling from market -----
    get_pwr_from_market() {
        return this.buy_from_market;
    }
    get_pwr_to_market() {
        return this.sell_to_market;
    }

// ---- Weather ----
    get_wind_speed(){
        return this.wind_speed;
    }
    set_wind_speed(zpeed) {
        this.wind_speed = zpeed;
    }
    get_temperature(){
        return this.temperature;
    }
    set_temperature(temperature){
        this.temperature = temperature;
    }

// ---- Production ----
    calc_production() {
        if(this.broken == 0){
            this.pwr_production = this.wind_speed*15;
        } else {
            this.pwr_production = 0;
        }
    }

    set_production(prod){
        this.pwr_production = prod;
    }

    get_production(){
        return this.pwr_production;
    }

    get_net_production() {
        return this.net_prod;
    }

// ---- Blocked ----
    set_blocked(block_time) {
        this.blocked = Math.max(block_time, 0); // prevents negative block
    }
    get_blocked() {
        return this.blocked;
    }
// ---- Broken ----
    get_broken() {
        return this.broken;
    }
    set_broken(broken_time) {
        this.broken = Math.max(broken_time, 0); // prevents negative block
    }
    turbine_break() { // Called each tick, will break turbine with probability of break_chance each day.
        var break_chance = 0.00115741 // 10 % break chance per day, 0.0005787 for 5%, 0.00011574 for 1 %
        var break_time = 21;
        if (Math.random() <= break_chance) {
            console.log(this.get_prosumer_id(), " got BROKD!");
            this.broken = break_time;
        }
    }
// ---- Blackout ----
    get_blackout(){
        return this.blackout;
    }
    set_blackout(blackout){
        this.blackout = blackout;
    }


// ---- Consumption ----
    calc_all_consumptions() { // to make sure they're calculated in the right order
        this.calc_temp_prosumption();
        this.calc_total_consumption();
    }
    calc_total_consumption() {
        this.total_consumption = this.get_base_consumption() + this.get_temp_consumption();
    }
    get_base_consumption() {
        return this.base_consumption;
    }
    get_total_consumption() {
        return this.total_consumption;
    }
    calc_temp_prosumption() {
        this.temperature_consumption = Math.abs(20 - this.temperature);
    }
    get_temp_consumption() {
        return this.temperature_consumption;
    }

    //------ BATTERY POWER -----
    /* This function will alter battery level and return how much it charged */
    update_battery_level(){
        var over = this.total_consumption < this.pwr_production; // true for overprod
        if (this.blocked > 0 && over) {
            pwr_to_charge = (this.pwr_production - this.total_consumption); // not multiplied with any distr, ALL excess goes to battery
            this.battery_level = Math.min(this.battery_max, this.battery_level + pwr_to_charge);
            return pwr_to_charge;
        }
        if (over && this.store_percentage > 0) {
            var pwr_to_charge = (this.pwr_production - this.total_consumption)*this.store_percentage; // how much of overprod to charge with
            if(pwr_to_charge+this.battery_level > this.battery_max) { // overcharge
                var temp = this.battery_max - this.battery_level;
                this.battery_level = this.battery_max;
                return temp;
            } else {
                this.battery_level += pwr_to_charge;
                return pwr_to_charge;
            }
        } else if(!over && this.drain_percentage > 0){
            var pwr_to_drain = (this.total_consumption - this.pwr_production)*this.drain_percentage; // how much of underprod to drain
            if(this.battery_level - pwr_to_drain < 0){ // undercharge
                var batlvl = this.battery_level;
                this.battery_level = 0;
                return -batlvl;
            } else {
                this.battery_level -= pwr_to_drain;
                return -pwr_to_drain;
            }
        }

    }

    set_battery_level(battery_lvl){
        this.battery_level = battery_lvl;
    }
    get_battery_level() {
        return this.battery_level;
    }
    get_battery_max() {
        return this.battery_max;
    }

// ---- distribution ----
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
    set_sell_percentage(sell){
        this.sell_percentage = sell;
    }
    set_store_percentage(store){
        this.store_percentage = store;
    }
    set_buy_percentage(buy){
        this.buy_percentage = buy;
    }
    set_drain_percentage(drain){
        this.drain_percentage = drain;
    }
}
module.exports = Prosumer;
