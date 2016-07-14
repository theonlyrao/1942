const Plane = require('./plane');

class SmallPlane extends Plane {
  constructor(options) {
    super(options);
    this.class = "small";
  }
}

SmallPlane.prototype.typeSpecificDimensions = function() {
  this.width = 8;
  this.height = 25;
  this.wingspan = 52;
  this.tailspan = 16;
};

module.exports = SmallPlane;
