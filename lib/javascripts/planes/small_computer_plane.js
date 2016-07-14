const SmallPlane = require('./small_plane');
const ComputerPlane = require('./computer_plane');
const Mixin = require('../mixin');

new Mixin(SmallPlane,ComputerPlane);

class SmallComputerPlane extends SmallPlane {
  constructor(options) {
    super(options);
    this.x = options.x || Math.floor(Math.random() * 600) + 50;
    this.y = -30;
    this.yMid = 5;
    this.heading = Math.floor(Math.random() * (2));
    this.hitCounterLimit = 1;
  }
}

module.exports = SmallComputerPlane;
