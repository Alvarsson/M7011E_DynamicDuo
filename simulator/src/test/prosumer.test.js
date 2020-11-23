var assert = require('assert');
const Prosumer = require('../entities/Prosumer');

describe('Prosumer', function() {
    const prosumer = new Prosumer(0);

  describe('Get prosumer id', function() {
    it('should return prosumer id 0.', function() {
      assert.equal(prosumer.get_prosumer_id(), 0);
    });
  });

  //describe('')


});