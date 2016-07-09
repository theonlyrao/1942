const assert = require('chai').assert;

const Plane = require('../lib/javascripts/plane');
const CollisionDetector = require('../lib/javascripts/collision_detector')

describe('Collision detector', function() {
    context('with one player and one computer', function() {
	var player = new Plane({type: "player", x: 93, y: 125});
	var computer = new Plane({type: "computer", x: 100, y: 100})

	it('knows when they collide', function() {
	    var detector = new CollisionDetector();
	    player.border = player.makeBorder();
	    computer.border = computer.makeBorder();
	    var first = detector.check(player, computer);
	    assert.equal(first, false);
	    player.y--;
	    player.border = player.makeBorder();
	    computer.border = computer.makeBorder();
	    var collision = detector.check(player, computer);
	    assert.equal(collision, true);
	});
    });

});
