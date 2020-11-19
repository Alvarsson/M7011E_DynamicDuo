class Consumer {
    constructor() {
        this.base_consumption = 20;
        this.temp_consumption;
        this.total_consumption = this.set_consumer_demand();
    }
    get_consumer_demand() {
        return (this.base_consumption + this.temp_consumption);
    }
    set_consumer_demand() {
        this.total_consumption = this.base_consumption + this.temp_consumption;
    }
    get_temp_consumption(temp) {
        return this.temp_consumption;
    }
    set_temp_consumption(temp) {
        this.temp_consumption = Math.abs(20 - temp);
    }
}
export {set_temp_consumption,
        set_consumer_demand,
        };