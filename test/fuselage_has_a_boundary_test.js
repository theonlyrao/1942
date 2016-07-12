const assert = require('chai').assert;

const SmallPlayerPlane = require('../lib/javascripts/planes/small_player_plane');

describe('Plane', function() {
    context('with defaults', function() {
	let plane = new SmallPlayerPlane({type: "player", x: 100, y: 100});

	it('has a border', function() {
	    plane.rectangle();
	    let border = plane.border;
	    let expected_border = [[100, 100], [102, 100],
				   [104, 100], [106, 100],
           [108,100],
				   [108, 101],[108, 103],
				   [108, 105],[108, 107],
				   [108, 109],[108, 111],
				   [108, 113],[108, 115],
				   [108, 117],[108, 119],
				   [108, 121],[108, 123],
           [108, 125],
				   [107, 125],[105, 125],
				   [103, 125],[101, 125],
           [100, 124],
				   [100, 122],[100, 120],
				   [100, 118],[100, 116],
				   [100, 114],[100, 112],
				   [100, 110],[100, 108],
				   [100, 106],[100, 104],
				   [100, 102]]
          //  [78,113],
				  //  [80,113], [82,113],
				  //  [84,113], [86,113],
				  //  [88,113], [90,113],
				  //  [92,113],[94,113],
				  //  [96,113], [98,113],
				  //  [102,113],
				  //  [104,113], [106,113],
				  //  [108,113], [110,113],
				  //  [112,113], [114,113],
				  //  [116,113], [118,113],
				  //  [120,113], [122,113],
				  //  [124,113], [126,113],
				  //  [128,113]]

	    assert.equal(expected_border.length, border.length);
	    assert.sameDeepMembers(expected_border, border);
	});
    });

});
