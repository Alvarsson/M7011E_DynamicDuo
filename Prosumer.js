class Prosumer {
    //currently basic constructor
    
    constructor(base_consumption, wind_speed) {
        this.base_consumption = base_consumption;
        this.pwr_production = this.set_wind_power(wind_speed);
        this.total_pwr_cons;
        this.battery_charge_rate;
        this.battery_level;
        this.battery_max = 200;
    }

    set_wind_power(wind_speed) {
        //lets assume we get 4 pwr for each 1 m/s of wind. So 4 m/s generates 16 pwr/ hour.
        this.pwr_production = wind_speed*4;
    }
    get_wind_power() {
        return this.pwr_production;
    }
    // base consumption - house allocated self-produced pwr.
    calc_total_cons() {
        this.total_pwr_cons = this.base_consumption - this.get_wind_power();
    }
    get_total_consumption() {
        return this.total_pwr_cons;
    }
    set_batter_power_rate(charge_rate) {
        this.battery_charge_rate = charge_rate;
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
    auto_control(flag_manual) {

    }




}