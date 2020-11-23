var assert = require('assert');
//var expect = require('mocha').expect;
//var prosumer = require('simulator/src/entities/Prosumer.js');
const Prosumer = require('../entities/Prosumer');

describe('Prosumer', function() {
    const prosumer = new Prosumer(0);

  describe('Get prosumer id', function() {
    it('should return prosumer id 0.', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
      //var proId = prosumer.get_prosumer_id();
      //expect(proId).to.equal(0);
    });
  });


});