class Consumer {
    constructor(temperature) {
        this.base_consumption = 20;
        this.temp_consumption = this.get_temp_consumption(temperature);
    }
    get_consumer_demand() {
        return (this.base_consumption + this.temp_consumption);
    }
    get_temp_consumption(temp) {
        return Math.abs(20 - temp);
    }
}