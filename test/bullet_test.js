const assert = require('chai').assert;

const Bullet = require('../lib/javascripts/bullet');

describe('Bullet', function() {
    context('from player', function() {
	let bullet = new Bullet({type: "player"});

	it('has a border', function() {
	    bullet.x = 100;
	    bullet.y = 120;
	    let bulletBorder = bullet.makeBorder();
	    let bulletExpectedBorder = [[100, 120],[101, 120],[101, 121],[100, 121],[100,122],[101,122]]
	    assert.sameDeepMembers(bulletBorder, bulletExpectedBorder);
	});
    });

});
