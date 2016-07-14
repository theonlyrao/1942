const Plane = require('./plane');

class BossComputerPlane extends Plane {
  constructor(options) {
    super(options);
    this.class = "boss";
    this.type = "computer";
    this.timerCount = 0;
    this.x = options.x || Math.floor(Math.random() * 600) + 50;
    this.y = -200;
    this.yMid = Math.floor(this.height - this.height/2);
    this.xHeading = Math.floor(Math.random() * (2));
    this.yHeading = Math.floor(Math.random() * (2));
    this.hitCounterLimit = 8;
  }
}

BossComputerPlane.prototype.typeSpecificDimensions = function() {
  this.width = 16;
  this.height = 50;
  this.wingspan = 104;
  this.tailspan = 32;
};

BossComputerPlane.prototype.move = function() {
  this.timerCount++;
  okHeading(this);
  this.x = this.x + this.xHeading;
  this.y = this.y + this.yHeading;
  if (this.timerCount > 75) {
    resetHeading(this);
  }
};

function resetHeading(plane) {
  plane.xHeading = Math.floor(Math.random() * (3)) * (Math.round(Math.random()) * 2 - 1);
  plane.yHeading = Math.floor(Math.random() * (3)) * (Math.round(Math.random()) * 2 - 1);
  plane.timerCount = 0;
}

function okHeading(plane) {
  if (plane.y < 10 ) {
    plane.yHeading = 1;
  }
  if (plane.x > 670 ) {
    plane.xHeading = -1;
  }
  if (plane.y > 100 ) {
    plane.yHeading = -1;
  }
  if (plane.x < 10 ) {
    plane.xHeading = 1;
  }
}

module.exports = BossComputerPlane;
