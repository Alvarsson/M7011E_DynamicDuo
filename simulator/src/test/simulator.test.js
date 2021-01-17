var assert = require('assert');
const Prosumer = require('../entities/Prosumer');
const Manager = require('../entities/Manager');
const Consumer = require('../entities/Consumer');
const { exception } = require('console');


describe('Prosumer', function() {
  describe('Get prosumer id', function() {
    it('Should return prosumer id 0.', function() {
      const prosumer = new Prosumer(0);
      assert.strictEqual(prosumer.get_prosumer_id(), 0);
    });
  });

  describe('Get sell/store from market', function() {
    it('Should return 0 for a newly instanciated prosumer', function() {
      const prosumer = new Prosumer(0);
      assert.strictEqual(prosumer.get_pwr_from_market(), 0);
      assert.strictEqual(prosumer.get_pwr_to_market(), 0);
    });
  });

  describe('Windspeed', function() {
    it('Setting windspeed and checking it\'s set with the getter', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_wind_speed(11);
      assert.strictEqual(prosumer.get_wind_speed(), 11);
    });
  });

  describe('Set/Get temperature', function() {
    it('Setting windspeed and checking it\'s set with the getter', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_temperature(-24);
      assert.strictEqual(prosumer.get_temperature(), -24);
    });
  });

  describe('Production', function() {
    it('Set/Get production', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_production(100);
      assert.strictEqual(prosumer.get_production(), 100);
    });
    it('Calc production, with wind speed 4 it should be 16', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_wind_speed(4);
      prosumer.calc_production();
      assert.strictEqual(prosumer.get_production(), 16);
    });
    it('Calc production, with broken turbine it should be 0', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_wind_speed(4);
      prosumer.set_broken(1);
      prosumer.calc_production();
      assert.strictEqual(prosumer.get_production(), 0);
    });
    it('See net production, should return -4 in this case', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_wind_speed(4);
      prosumer.calc_production();
      prosumer.set_temperature(20);
      prosumer.calc_all_consumptions();
      prosumer.recalc();
      assert.strictEqual(prosumer.get_net_production(), -4);
    });
  });

  describe('Blocked', function() {
    it('Setting blocked and checking it\'s set with the getter', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_blocked(1);
      assert.strictEqual(prosumer.get_blocked(), 1);
    });
  });

  describe('Broken', function() {
    it('Setting broken and checking it\'s set with the getter', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_broken(1);
      assert.strictEqual(prosumer.get_broken(), 1);
    });
  });

  describe('Blackout', function() {
    it('Setting blackout and checking it\'s set with the getter', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_blackout(true);
      assert.strictEqual(prosumer.get_blackout(), true);
    });
  });

  describe('Consumption', function() {
    it('Base consumption should be 20', function() {
      const prosumer = new Prosumer(0);
      assert.strictEqual(prosumer.get_base_consumption(), 20);
    });
    it('Calculating temp consumption, should be 40 for temp: -20', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_temperature(-20);
      prosumer.calc_temp_prosumption();
      assert.strictEqual(prosumer.get_temp_consumption(), 40);
    });
    it('Calculating total consumption with temp -20, should be 60', function() {
      const prosumer = new Prosumer(0);
      prosumer.set_temperature(-20);
      prosumer.calc_all_consumptions();
      assert.strictEqual(prosumer.get_total_consumption(), 60);
    });
  });

  describe('Battery', function() {
    it('Battery level check with set/get', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_battery_level(100);
      assert.strictEqual(prosumer.get_battery_level(), 100);
    });
    it('Battery overproduction, empty battery', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(30);
      prosumer.set_battery_level(0);
      assert.strictEqual(prosumer.update_battery_level(), 5);
      assert.strictEqual(prosumer.get_battery_level(), 5);
    });
    it('Battery overproduction, empty battery, blocked, should store all', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(30);
      prosumer.set_battery_level(0);
      prosumer.set_blocked(1);
      assert.strictEqual(prosumer.update_battery_level(), 10);
      assert.strictEqual(prosumer.get_battery_level(), 10);
    });
    it('Battery overproduction, 2 from full battery, should fill battery', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(30);
      prosumer.set_battery_level(198);
      assert.strictEqual(prosumer.update_battery_level(), 2);
      assert.strictEqual(prosumer.get_battery_level(), 200);
    });
    it('Battery underproduction, battery 10, should drain 5', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(10);
      prosumer.set_battery_level(10);
      assert.strictEqual(prosumer.update_battery_level(), -5);
      assert.strictEqual(prosumer.get_battery_level(), 5);
    });
    it('Battery underproduction, battery 2, should drain 2', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(10);
      prosumer.set_battery_level(2);
      assert.strictEqual(prosumer.update_battery_level(), -2);
      assert.strictEqual(prosumer.get_battery_level(), 0);
    });
  });
/* Not possible due to probability
  describe('Recalc', function() {
    it('Overproduction, empty battery, should get 5 to battery and 5 to sell', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(30);
      prosumer.set_battery_level(0);
      prosumer.recalc();
      assert.strictEqual(prosumer.get_battery_level(), 4);
      assert.strictEqual(prosumer.get_pwr_to_market(), 5);
    });
    it('Overproduction, empty battery, blocked, should sell all', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(30);
      prosumer.set_battery_level(0);
      prosumer.set_blocked(1);
      prosumer.recalc();
      assert.strictEqual(prosumer.get_battery_level(), 10);
      assert.strictEqual(prosumer.get_pwr_to_market(), 10);
    });
    it('Underproduction, battery 2, should drain 2, buy 8', function(){
      const prosumer = new Prosumer(0);
      prosumer.set_production(10);
      prosumer.set_battery_level(2);
      prosumer.recalc();
      assert.strictEqual(prosumer.get_battery_level(), 0);
      assert.strictEqual(prosumer.get_pwr_from_market(), 8);
    });
  });*/
});


describe('Manager', function() {
  describe('Prosumer & consumer count', function() {
    it('Newly initiated', function() {
      const manager = new Manager(2, 10);
      assert.strictEqual(manager.get_nr_consumers(), 10);
      assert.strictEqual(manager.get_nr_prosumers(), 2);
    });
    it('Altered nr of prosumers', function() {
      const manager = new Manager(2, 10);
      manager.set_nr_prosumers(4);
      assert.strictEqual(manager.get_nr_consumers(), 10);
      assert.strictEqual(manager.get_nr_prosumers(), 4);
    });
  });
  describe('Market demand', function() {
    it('Setting windspeed and checking it\'s set with the getter', function() {
      const manager = new Manager(2,10);
      manager.set_market_demand(30);
      assert.strictEqual(manager.get_market_demand(), 30);
    });
  });
  describe('Production', function() {
    it('Setting production and checking it\'s set with the getter', function() {
      const manager = new Manager(2,10);
      manager.set_pwr_production(200);
      assert.strictEqual(manager.get_pwr_production(), 200);
    });
    it('Setting production to negative value should set it to 0', function() {
      const manager = new Manager(2,10);
      manager.set_pwr_production(-200);
      assert.strictEqual(manager.get_pwr_production(), 0);
    });
  });
  describe('Plant status', function() {
    it('Setting plant status and checking it\'s set with the getter', function() {
      const manager = new Manager(2,10);
      manager.set_plant_status(2);
      assert.strictEqual(manager.get_plant_status(), 2);
    });
    it('Setting plant status to value outside range (1,3) should leave it unchanged', function() {
      const manager = new Manager(2,10);
      manager.set_plant_status(2);
      manager.set_plant_status(5);
      assert.strictEqual(manager.get_plant_status(), 2);
    });
  });
  describe('Price', function() {
    it('Setting plant status and checking it\'s set with the getter', function() {
      const manager = new Manager(2,10);
      manager.set_pwr_price(10);
      assert.strictEqual(manager.get_pwr_price(), 10);
    });
    it('Company price recommendation should be 60 with 2 pro, 10 con & 100 MD', function() {
      const manager = new Manager(2,10);
      manager.set_market_demand(100);
      assert.strictEqual(Math.floor(manager.get_company_price_rec()), 60);
    });
  });
  describe('Buffer', function() {
    it('Charging an empty buffer, should result in buffer: 100', function() {
      const manager = new Manager(2,10);
      manager.set_buffer_level(0);
      manager.charge_buffer(100);
      assert.strictEqual(manager.get_buffer_level(), 100);
    });
    it('Draining a satisfactory buffer, should result in under: 0, buffer: 50', function() {
      const manager = new Manager(2,10);
      manager.set_buffer_level(100);
      assert.strictEqual(manager.drain_buffer(50), 0); // under 0
      assert.strictEqual(manager.get_buffer_level(), 50);
    });
    it('Draining a non-satisfactory buffer, should result in under: 40, buffer: 0', function() {
      const manager = new Manager(2,10);
      manager.set_buffer_level(10);
      assert.strictEqual(manager.drain_buffer(50), 40); // under 40
      assert.strictEqual(manager.get_buffer_level(), 0);
    });
  });
  describe('Incoming status change countdown', function() {
    it('Countdown correct', function() {
      const manager = new Manager(2,10);
      manager.set_inc_status_change(2,3);
      manager.recalc_inc_changes(); // called 3 times to make sure change is set
      assert.strictEqual(manager.get_inc_status_change_timer(), 1);
      manager.recalc_inc_changes();
      manager.recalc_inc_changes();
      assert.strictEqual(manager.get_plant_status(), 3); // should have changed to 3 now
    });
    it('Switching from 3 to 1 should go by 2', function() {
      const manager = new Manager(2,10);
      manager.set_plant_status(3);
      manager.set_inc_status_change(2,1);
      manager.recalc_inc_changes();
      assert.strictEqual(manager.get_plant_status(), 2);
    });
  });
  describe('Incoming prod change countdown', function() {
    it('Countdown correct', function() {
      const manager = new Manager(2,10);
      manager.set_inc_prod_change(2,300);
      manager.recalc_inc_changes(); // called 3 times to make sure change is set
      assert.strictEqual(manager.get_inc_prod_change_timer(), 1);
      manager.recalc_inc_changes();
      manager.recalc_inc_changes();
      assert.strictEqual(manager.get_pwr_production(), 300); // should have changed to 300 now
    });
  });
});

describe('Consumer', function() {
  describe('Consumption', function() {
    it('Base consumption should be 20', function() {
      const consumer = new Consumer();
      assert.strictEqual(consumer.get_consumer_demand(), 20);
    });
    it('Calculating temp consumption, total should be 60', function() {
      const consumer = new Consumer();
      consumer.set_temperature(-20);
      consumer.recalc();
      assert.strictEqual(consumer.get_consumer_demand(), 60);
    });
  });
});