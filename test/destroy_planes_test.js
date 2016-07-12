const assert = require('chai').assert;

const SmallPlayerPlane = require('../lib/javascripts/planes/small_player_plane');
const CollisionDetector = require('../lib/javascripts/collision_detector')

describe('Collision detector', function() {
    context('with one player and one computer', function() {
	var playerPlane = new SmallPlayerPlane({type: "player", x: 93, y: 126});
	var computerPlane = new SmallPlayerPlane({type: "computer", x: 100, y: 100})

	it('knows when they collide', function() {
	    var detector = new CollisionDetector();
	    playerPlane.rectangle();
	    computerPlane.rectangle();
	    var first = detector.check(playerPlane, computerPlane);
	    assert.equal(first, false);
	    playerPlane.y = playerPlane.y -2;
	    playerPlane.rectangle();
	    computerPlane.rectangle();
	    var collision = detector.check(playerPlane, computerPlane);
	    assert.equal(collision, true);
	});
    });

});
