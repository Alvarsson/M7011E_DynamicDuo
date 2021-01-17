class Consumer {
    constructor() {
        this.base_consumption = 20;
        this.temp_consumption = 0;
        this.total_consumption = 20;
        this.temperature = 20;
    }
    recalc(){
        this.set_temp_consumption();
        this.set_consumer_demand();
    }

    get_consumer_demand() {
        return this.total_consumption;
    }
    set_consumer_demand() {
        this.total_consumption = this.base_consumption + this.temp_consumption;
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