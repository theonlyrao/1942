const assert = require('chai').assert;
const SmallPlayerPlane = require('../lib/javascripts/planes/small_player_plane');
const SmallComputerPlane = require('../lib/javascripts/planes/small_computer_plane');
const CollisionDetector = require('../lib/javascripts/collision_detector')

describe('Check a planes state', function() {
  context('with one player and one computer', function() {
    var player = new SmallPlayerPlane({type: "player", x: 93, y: 125});
    var computer = new SmallComputerPlane({type: "computer", x: 100, y: 100})

    it('computer knows it alive', function() {
      assert.equal(computer.status, "alive");
    });

    it('computer knows when it dies and players score increments', function() {
      let detector = new CollisionDetector();
      player.rectangle();
      computer.rectangle();
      let bullet = player.fire();
      bullet.border = bullet.makeBorder();

      let first = detector.check(computer,bullet);
      assert.equal(first, false);
      assert.equal(player.score,0);
      bullet.x = 100;
      bullet.y = -30;
      bullet.border = bullet.makeBorder();
      let second = detector.check(computer,bullet);

      if (second === true) {
        player.increaseScore()
        computer.destroy()
      }

      assert.equal(player.score,100);
      assert.equal(computer.status,"dead");
    });

  });

});
