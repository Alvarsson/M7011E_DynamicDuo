class Manager {
    constructor(prosumers, consumers) {
        this.pwr_production = 1000; // Are these reasonable?
        this.plant_status = 1; // 1 for running, 2 for starting, 3 for stopped.
        this.pwr_to_market = 1000;

        this.store = 0;
        this.sell = 1;

        this.pwr_to_buffer;
        this.pwr_from_buffer;
        this.buffer_level = 0;
        this.pwr_missing = 0; // During a blackout, how much power is missing i.e., how many will be blacked out.

        this.inc_status_change_timer = -1;
        this.inc_status_change = -1;
        this.inc_prod_change_timer = -1;
        this.inc_prod_change = -1;


        this.market_demand = 0;
        this.pwr_price = 2;

        this.nr_of_prosumers = prosumers;
        this.nr_of_consumers = consumers;
    }

    recalc() {
        //recom_market price <- done directly to logs
        // recalc pwr flows according to distr
        this.calc_pwr_to_buffer();
        this.calc_pwr_to_market();
        // charge battery
        this.charge_buffer(this.pwr_to_buffer);
        // blackout?
        var net_prod = this.pwr_to_market - this.market_demand;
        if(net_prod < 0) { // if too little prod
            this.pwr_missing = this.drain_buffer(Math.abs(net_prod));
        }
        this.recalc_inc_changes();
    }

    recalc_inc_changes() {
        // check if we need to change values
        if(this.inc_prod_change_timer == 0){ // at 0 we commit the change
            this.pwr_production = this.inc_prod_change;
            this.inc_prod_change = -1; // reset
            this.inc_prod_change_timer = -1;
        }
        if(this.inc_status_change_timer == 0) {
            this.plant_status = this.inc_status_change;
            this.inc_status_change = -1;
            this.inc_status_change_timer = -1;
        }
        //countdown
        if (this.inc_status_change_timer > 0) {
            this.inc_status_change_timer -= 1;
        }
        if (this.inc_prod_change_timer > 0) {
            this.inc_prod_change_timer -= 1;
        }
    }
// ----- NR of Prosumers ----
    set_nr_prosumers(num) {
        this.nr_of_prosumers = num;
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
        this.pwr_production = Math.max(pwr,0);
    }
    get_pwr_production() {
        return this.pwr_production;
    }

//-----POWER PLANT STATUS ------
    set_plant_status(numb) { // 1 for running, 2 for stopped.
        if (numb < 4 && numb > 0) {
            this.plant_status = numb;
        }
    }
    get_plant_status() {
        return this.plant_status;
    }

// ----- INCOMING CHANGES  -----
    set_inc_status_change(timer, status_change){
        this.inc_status_change_timer = timer;
        this.inc_status_change = status_change;
    }
    get_inc_status_change_timer(){
        return this.inc_status_change_timer;
    }
    get_inc_status_change(){
        return this.inc_status_change;
    }
    set_inc_prod_change(timer, prod_change){
        this.inc_prod_change_timer = timer;
        this.inc_prod_change = prod_change;
    }
    get_inc_prod_change_timer(){
        return this.inc_prod_change_timer;
    }
    get_inc_prod_change(){
        return this.inc_prod_change;
    }


// ----- PRICE -----
    set_pwr_price(price) { // Depending on current demand.
        this.pwr_price = price;
    }
    get_pwr_price() {
        return this.pwr_price;
    }
    get_company_price_rec() { // returns the recommended pwr cost this moment. 
        var service_price = 500;
        var multiplier = 2.25;
        var con_plus_pros = this.nr_of_consumers + this.nr_of_prosumers;
        return (multiplier*this.market_demand+service_price)/con_plus_pros;// con_plus_pros is the amount of consumers+prosumers.
    }

//------ DISTRIBUTION -------
// When producing, control a ratio of electricity being sent to the buffer and 
//to the market (when stopped the buffer should be used to supply the market demand)
    set_plant_distribution(store, sell) { // producing over market demand
        this.store = store;
        this.sell = sell;
        //production = this.get_pwr_production();
        //this.set_pwr_to_market(production, sell);
        //this.set_pwr_to_buffer(production, store);
    }
    /*check_plant_stopped() { // check if plant is stopped then change dist. called each tick
        var market_demand = this.get_market_demand();
        if (this.get_plant_status() == 3) {
            this.set_pwr_to_market(0, market_demand)
            this.set_pwr_from_buffer(1, market_demand)
        }
    }*/
    calc_pwr_to_market() { // sets an amount of pwr to market for each tick i guess.
        this.pwr_to_market = this.pwr_production * this.sell;
    }
    get_pwr_to_market() {
        return this.pwr_to_market;
    }

//----- BUFFER ----
    get_buffer_level(){
        return this.buffer_level;
    }
    calc_pwr_to_buffer() {
        this.pwr_to_buffer = this.pwr_production * this.store;
    }
    get_pwr_to_buffer() {
        return this.pwr_to_buffer;
    }
    
    charge_buffer(pwr_amount) {
        this.buffer_level += pwr_amount;
    }
    // this method returns the power missing (in case pwr_amount is larger than buffer level)
    drain_buffer(pwr_amount){
        if(pwr_amount > this.buffer_level){ // attempting to drain more than buffer has
            var under = pwr_amount - this.buffer_level;
            this.buffer_level = 0;
            return under;
        } else {
            this.buffer_level -= pwr_amount;
            return 0;
        }

    }

// ----- BLACKOUT-----
    get_pwr_missing() {
        return this.pwr_missing;// flag this as event so that prosumer can make descision.
    }
}
module.exports = Manager;




