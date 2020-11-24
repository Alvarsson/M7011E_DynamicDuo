var assert = require('assert');
const Prosumer = require('../entities/Prosumer');

describe('Prosumer', function() {
    

  describe('Get prosumer id', function() {
    it('should return prosumer id 0.', function() {
      const prosumer = new Prosumer(0);
      assert.equal(prosumer.get_prosumer_id(), 0);
    });
  });

  describe('Get wind power', function() {
    it('should return 20', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_wind_power(5);
      assert.strictEqual(prosumer.get_wind_power(), 20);
    });
  });
  describe('Get wind power with turbine broken', function() {
    it('should return 0', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_wind_power(5);
      prosumer.set_turbine_broken(true);
      prosumer.set_wind_power(2);
      assert.strictEqual(prosumer.get_wind_power(), 0);
    });
  });
  describe('Get battery warning', function() {
    it('should return true', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_battery_level(20);
      prosumer.warning_low_battery();
      assert(prosumer.low_battery);
    });
  });
  describe('Get temperatur consumption', function() {
    it('should return 20', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_temp_prosumption(0);
      assert.strictEqual(prosumer.get_temp_consumption(), 20);
    });
  });
  describe('Have excess power', function() {
    it('should return 10', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_store_to_battery(1,20);
      prosumer.set_battery_level(190);
      prosumer.charge_battery();
      assert.strictEqual(prosumer.get_excess_pwr(), 10);
    });
  });
  describe('Empty battery by discharge', function() {
    it('should return 0', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_drain_from_battery(1,20);
      prosumer.set_battery_level(10);
      prosumer.discharge_battery();
      assert.strictEqual(prosumer.get_battery_level(), 0);
    });
  });
  describe('Power to house when over producing', function() {
    it('should return 20', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_wind_power(10); // 40 pwr from wind turbine
      prosumer.set_temp_prosumption(20);
      prosumer.calc_total_consumption();
      prosumer.pwr_dist_over(0.5, 0.5);
      assert.strictEqual(prosumer.get_wind_pwr_to_house(), 20);
    });
  });
  describe('Power to battery when blocked but over produced', function() {
    it('should return 20', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_wind_power(10); // 40 pwr from wind turbine
      prosumer.set_temp_prosumption(20);
      prosumer.set_pwr_block(true);
      prosumer.calc_total_consumption();
      prosumer.pwr_dist_over(0.5, 0.5);
      assert.strictEqual(prosumer.get_pwr_to_battery(), 20);
    });
  });


});