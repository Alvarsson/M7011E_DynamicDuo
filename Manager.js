class Manager {
    constructor() {
        this.pwr_production;
        this.battery_level;
        this.blackout_warning;
        this.pwr_price;
    }
    set_pwr_production(pwr) {
        this.pwr_production = pwr;
    }
    get_pwr_production() {
        return this.pwr_production;
    }
    set_pwr_price(price) { // Depending on current demand.
        this.pwr_price = price;
    }
    get_pwr_price() {
        return this.pwr_price;
    }
    set_stop_prduction() {
        this.pwr_production = 0;
    }
    set_blackout_warning(bool) {
        this.blackout_warning = bool; // flag this as event so that prosumer can make descision.
    }
    get_company_price_rec(demand) { // returns the recommended pwr cost this moment.
        var service_price = 500;
        var multiplier = 2.25;
        return (multiplier*demand+service_price)/10;// 10 is the amount of consumers+prosumers.
    }

    




}





