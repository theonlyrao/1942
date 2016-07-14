const SmallPlane = require('./small_plane');

class SmallPlayerPlane extends SmallPlane {
  constructor(options) {
    super(options);
    this.x = options.x || 350;
    this.y = options.y || 410;
    this.score = 0;
    this.yMid = 12;
    this.hitCounterLimit = 3;
  }
}

SmallPlayerPlane.prototype.increaseScore = function() {
  this.score = this.score + 100;
};

SmallPlayerPlane.prototype.yMid = function() {
  return this.y + (this.height/2);
};

module.exports = SmallPlayerPlane;
