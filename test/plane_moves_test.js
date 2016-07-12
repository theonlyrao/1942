const assert = require('chai').assert;

const SmallPlayerPlane = require('../lib/javascripts/planes/small_player_plane');
const SmallComputerPlane = require('../lib/javascripts/planes/small_computer_plane');

describe('Plane', function() {
  context('Default plane', function() {
    var plane = new SmallPlayerPlane({type: "player"});
    var attributes = { type: "player", x: 350, y: 410,
    width: 8, height: 25, wingspan: 52,
    tailspan: 16}

    it('default planes type is player', function() {
      assert.equal(plane.type, attributes.type);
    });

    it('player planes x coordinate', function() {
      assert.equal(plane.x, attributes.x);
    });

    it('player planes y coordinate', function() {
      assert.equal(plane.y, attributes.y);
    });

    it('player planes width', function() {
      assert.equal(plane.width, attributes.width);
    });

    it('player planes height', function() {
      assert.equal(plane.height, attributes.height);
    });

    it('player planes wingspan', function() {
      assert.equal(plane.wingspan, attributes.wingspan);
    });

    it('player planes tailspan', function() {
      assert.equal(plane.tailspan, attributes.tailspan);
    });

  });

  context('is told to move', function() {
    it('plane is told to move north', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 410});
      plane.moveNorth(1)
      assert.equal(plane.y, 409);
    });

    it('plane is told to move south', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 410});
      plane.moveSouth(1)
      assert.equal(plane.y, 411);
    });

    it('plane is told to move east', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 410});
      plane.moveEast(1)
      assert.equal(plane.x, 351);
    });

    it('plane is told to move west', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 410});
      plane.moveWest(1)
      assert.equal(plane.x, 349);
    });

    it('plane doesnt move north if it hits boundary', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 20});
      plane.moveNorth(1)
      assert.equal(plane.y, 20);
    });

    it('plane doesnt move south if it hits boundary', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 350,y: 460});
      plane.moveSouth(1)
      assert.equal(plane.y, 460);
    });

    it('plane transfers to west it hits boundary east boundary', function() {
      var plane = new SmallPlayerPlane({type: "player", x: 731,y: 350});
      plane.moveEast(1)
      assert.equal(plane.x, -30);
    });

    it('plane transfers to west it hits boundary east boundary', function() {
      var plane = new SmallPlayerPlane({type: "player", x: -29,y: 350});
      plane.moveWest(1)
      assert.equal(plane.x, 730);
    });

  });

  describe('Computer plane', function() {
    context('has default', function() {
      var plane = new SmallComputerPlane({type: "computer"});

      it('type of computer', function() {
        assert.equal(plane.type, "computer");
      });

      it('x coordinate', function() {
        assert.operator(plane.x, "<", 651)
        assert.operator(plane.x, ">", 49)
      });

      it('y coordinate', function() {
        assert.equal(plane.y, -30)
      });
    });
  });


});
