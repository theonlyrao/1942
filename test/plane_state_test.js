const assert = require('chai').assert;
const Plane = require('../lib/javascripts/plane');
const CollisionDetector = require('../lib/javascripts/collision_detector')

describe('Check a planes state', function() {
  context('with one player and one computer', function() {
    var player = new Plane({type: "player", x: 93, y: 125});
    var computer = new Plane({type: "computer", x: 100, y: 100})

    it('computer knows it alive', function() {
      assert.equal(computer.status, "alive");
    });

    it('computer knows when it dies and players score increments', function() {
      var detector = new CollisionDetector();
      player.border = player.makeBorder();
      computer.border = computer.makeBorder();
      let bullet = player.fire();
      bullet.border = bullet.makeBorder();
      var first = detector.check(computer,bullet);

      assert.equal(first, false);
      assert.equal(player.score,0);

      bullet.x = 100;
      bullet.y = 100;
      bullet.border = bullet.makeBorder();
      var second = detector.check(computer,bullet);

      if (second === true) {
        player.increaseScore()
        computer.destroy()
      }

      assert.equal(player.score,100);
      assert.equal(computer.status,"dead");
    });

  });

});
