class Manager {
    constructor() {
        this.pwr_production;
        this.plant_status;
        this.pwr_to_market;

        this.pwr_to_buffer;
        this.pwr_from_buffer;
        this.buffer_level;

        this.blackout_warning;

        this.market_demand;
        this.pwr_price;
    }

// TODO: Question, should the amount of prosumers + consumers be sent into the get company price? Going for yes this time.
// ----- DEMAND -------

    set_market_demand(demand) {
        this.market_demand = demand;
    }
    get_market_demand() {
        return this.market_demand;
    }

// ----- PRODUCTION -----
    set_pwr_production(pwr) {
        this.pwr_production = pwr;
    }
    get_pwr_production() {
        return this.pwr_production;
    }
    set_stop_production() {
        this.pwr_production = 0;
    }

//-----POWER PLANT STATUS ------
    set_plant_status(numb) { // 1 for running, 2 for starting, 3 for stopped.
        if (numb < 4 && numb > 0) {
            this.plant_status = numb;
        }
    }
    get_plant_status() {
        return this.plant_status;
    }

// ----- PRICE -----
    set_pwr_price(price) { // Depending on current demand.
        this.pwr_price = price;
    }
    get_pwr_price() {
        return this.pwr_price;
    }
    get_company_price_rec(demand, con_plus_pros) { // returns the recommended pwr cost this moment. 
        var service_price = 500;
        var multiplier = 2.25;
        return (multiplier*demand+service_price)/con_plus_pros;// con_plus_pros is the amount of consumers+prosumers.
    }

//------ DISTRIBUTION -------
// When producing, control a ratio of electricity being sent to the buffer and 
//to the market (when stopped the buffer should be used to supply the market demand)
    set_plant_dist(buffer, market) { // producing over market demand
        production = this.get_pwr_production();
        this.set_pwr_to_market(production, market);
        this.set_pwr_to_buffer(production, buffer);
    }
    check_plant_stopped() { // check if plant is stopped then change dist. called each tick
        var market_demand = this.get_market_demand();
        if (this.get_plant_status() == 3) {
            this.set_pwr_to_market(0, market_demand)
            this.set_pwr_from_buffer(1, market_demand)
        }
    }
    set_pwr_to_market(production, dist) { // sets an amount of pwr to market for each tick i guess.
        this.pwr_to_market = production * dist;
    }
    get_pwr_to_market() {
        return this.pwr_to_market;
    }

//----- BUFFER ----
    set_pwr_to_buffer(production, dist) {
        this.pwr_to_buffer = production * dist;
    }
    get_pwr_to_buffer() {
        return this.pwr_to_buffer;
    }
    set_pwr_from_buffer() {
        this.pwr_from_buffer 
    }
    get_pwr_from_buffer() {
        return this.pwr_from_buffer;
    }
    charge_buffer(pwr_amount) { // Called each tick
        this.buffer_level += pwr_amount;
    }
    discharge_buffer(pwr_amount) {
        if (this.buffer_level - pwr_amount < 0) {
            this.buffer_level = 0;
        } 
        else {
            this.buffer_level -= pwr_amount
        } 
    }

// ----- BLACKOUT-----
    set_blackout_warning(bool) {
        this.blackout_warning = bool; // flag this as event so that prosumer can make descision.
    }
}
module.exports = Manager;




