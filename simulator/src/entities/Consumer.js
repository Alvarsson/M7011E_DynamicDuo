class Consumer {
    constructor() {
        this.base_consumption = 20;
        this.temp_consumption = 0;
        this.total_consumption = this.set_consumer_demand();
        this.temperature = 20;
    }
    get_consumer_demand() {
        return this.total_consumption;
    }
    set_consumer_demand() {
        return this.base_consumption + this.temp_consumption;
    }
    get_temp_consumption() {
        return this.temp_consumption;
    }
    set_temp_consumption() {
        this.temp_consumption = Math.abs(20 - this.temperature);
    }
    set_temperature(temp){
        this.temperature = temp;
    }
}
module.exports = Consumer;