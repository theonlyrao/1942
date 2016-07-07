function Plane(options) {
  this.type = options.type || "player";
  this.x = options.x || 350;
  this.y = options.y || 410;
  this.width = options.width || 8;
  this.height = options.height || 25;
  this.wingspan = options.wingspan || 52;
  this.tailspan = options.tailspan || 16;
  // var xMid = x + (width/2);
  // // fuselage
  // context.fillRect(x, y, width, height);
  // // wings
  // context.moveTo(xMid - (wingspan/2), y + 13);
  // context.lineTo(xMid, y + 5);
  // context.lineTo(xMid + (wingspan/2), y + 13);
  // context.fill();
  // // nose
  // context.moveTo(x, y);
  // context.lineTo(xMid, y - 5);
  // context.lineTo(x + width, y);
  // context.fill();
  // // fuselage-tail connector
  // context.moveTo(x, y + height);
  // context.lineTo(xMid, y + height + 5);
  // context.lineTo(x + width, y + height);
  // context.fill();
  // // tail
  // context.moveTo(xMid - (tailspan/2), y + 32);
  // context.lineTo(xMid, y + 25);
  // context.lineTo(xMid + (tailspan/2), y + 32);
  // context.fill();
};

Plane.prototype.moveNorth = function() {
  if (this.y - 7 >= 20) {
    this.y = this.y - 7;
  };
}

Plane.prototype.moveSouth = function() {
  if (this.y + 7 <= 460) {
    this.y = this.y + 7;
  };
}

Plane.prototype.moveEast = function() {
  if (this.x < 731) {
    this.x = this.x + 7;
  } else {
    this.x = -30;
  }
}

Plane.prototype.moveWest = function() {
  if (this.x > -29) {
    this.x = this.x - 7;
  } else {
    this.x = 730;
  };
}

module.exports = Plane;
