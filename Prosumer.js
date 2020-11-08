class Prosumer {
    //currently basic constructor
    
    constructor(base_consumption, wind_speed) {
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
        this.total_pwr_cons = this.base_consumption + this.temperature_consumption; 
    }
    get_total_consumption() {
        return this.total_pwr_cons;
    }
    calc_consumption_with_pwr() { // consumption after removeinng wind power
        return (this.total_pwr_cons - this.get_pwr_to_house);
    }
    set_temp_consumption(temperature) {
        this.temperature_consumption = Math.abs(20 - temperature);
    }
    get_temp_consumption() {
        return this.temperature_consumption;
    }

//------ BATTERY POWER -----
    set_pwr_to_battery(percentage) {
        this.battery_charge_rate = percentage;
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
    set_pwr_from_battery() {
        //TODO: set power from battery to house.
    }

//------ HOUSE POWER -----
    get_pwr_to_house() {
        return this.pwr_to_house;
    }
    set_pwr_to_house(percentage) {
        this.pwr_to_house = this.get_wind_power * percentage;
    }


//------ POWER DISTRIBUTION ------
    set_pwr_distribution(house, battery, grid) { // assuming we send in number such as 10%, 50% etc.
        if ((house+battery+grid) == 100) { // TODO: just check that combined is not over 100%
            this.set_pwr_to_house(house/100);
            this.set_pwr_to_battery(battery/100);
            this.set_pwr_to_market(grid/100);
        } else {
            console.log("Can't do more that 100% of that."); // SEND SOME ERROR
        }
    }
 
    set_pwr_to_market(percentage) {
        this.market_pwr = this.pwr_production * (percentage/100);
    }
    get_pwr_to_market() {
        return this.market_pwr;
    }
    distribution_calculator() { // to calc pwr dist when we dont feel like it.

    }
    set_manual_distribution(house, battery, market) {
        //TODO: just call set distr with values
    }
    // if we want it
    auto_control() {
        // this need to look at market price, pwr production, battery level, pwr consumption
        // Lets just do some cases and call that "automated".
        var market_price; // get market price somehow
        var pwr_prod = this.get_wind_power();
        var battery_level = this.get_battery_level();
        var consumption = this.get_total_consumption();
        // if maket price high, pwr production high, battery level high and power consumption low, Sell to market
        //TODO: Change numbers to real once we set them
        if (!this.override) {
            if (market_price > 5 && pwr_prod > 15 && battery_level > 150 && consumption < 30) {
                this.set_pwr_distribution(20,0,80); // set to 
                this.set_pwr_from_battery
            }
            // pwr produc exceeds consumption.
            else if (pwr_prod > consumption && battery_level < this.battery_max) {
                var pwr_percentage = (pwr_prod-consumption)/pwr_prod;

                this.set_pwr_distribution(pwr_percentage, 20, 80);
            }
            else if(pwr_prod > consumption && battery_level == this.battery_max) {
                var pwr_percentage = (pwr_prod-consumption)/pwr_prod;
                this.set_pwr_distribution(pwr_percentage, 0, );
            }
        }
    }




}