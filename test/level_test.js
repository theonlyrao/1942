const assert = require('chai').assert;
const Level = require('../lib/javascripts/level')

describe('Level', function() {
  context('with defaults', function() {

    it('has number of one', function() {
      var level = new Level()
      assert.equal(level.number, 1)
    });

    it('next level adds 1 to number', function() {
      var level = new Level()
      level.nextLevel()
      assert.equal(level.number, 2)
    });

    it('makePlanes makes planes according to level number', function() {
      var level = new Level()
      var planes = level.makePlanes()
      assert.equal(planes[0].type, "computer")
      assert.equal(planes[0].class, "small")
      assert.equal(planes[7].type, "computer")
      assert.equal(planes[7].class, "boss")
      assert.equal(planes.length, 8)

      level.nextLevel()
      var planes = level.makePlanes()

      assert.equal(planes.length, 9)
    });

  });

});
