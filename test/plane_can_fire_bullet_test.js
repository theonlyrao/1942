const assert = require('chai').assert;

const Plane = require('../lib/javascripts/plane');

describe('Plane', function() {
    context('player at new location', function() {
	let plane = new Plane({x: 190, y: 200, type: "player" });

	it('can fire bullet', function() {
	    let playerBullet = plane.fire();
	    assert.equal(playerBullet.x, plane.x + plane.width/2);
	    assert.equal(playerBullet.y, plane.y - 3);
	    assert.equal(playerBullet.type, plane.type)
	    assert.equal(plane.bullets.length, 1)
	});
    });

    context('computer at new location', function() {
	let plane = new Plane({x: 190, y: 200, type: "computer" });

	it('can fire bullet', function() {
	    let playerBullet = plane.fire();
	    assert.equal(playerBullet.x, plane.x + plane.width/2);
	    assert.equal(playerBullet.y, plane.y + 3);
	    assert.equal(playerBullet.type, plane.type)
	    assert.equal(plane.bullets.length, 1)
	});
    });

});
