function Plane(options) {
    if (options.type === "player") {
	this.type = options.type
	this.x = options.x || 350;
	this.y = options.y || 410;
	this.width = options.width || 8;
	this.height = options.height || 25;
	this.wingspan = options.wingspan || 52;
	this.tailspan = options.tailspan || 16;
} else if (options.type === "computer") {
	this.type = options.type
	this.x = options.x || Math.floor(Math.random() * 600) + 50;
	this.y = options.y || -30;
	this.width = options.width || 8;
	this.height = options.height || 25;
	this.wingspan = options.wingspan || 52;
	this.tailspan = options.tailspan || 16;
	this.heading = Math.floor(Math.random() * (2))
    }
};

Plane.prototype.move = function(){
    this.y = this.y + 1.5;
    if (this.heading === 0){
	this.moveWest();
    } else {
	this.moveEast();
    }
}

Plane.prototype.moveNorth = function() {
  if (this.y >= 20) {
    this.y = this.y - 1;
  };
}

Plane.prototype.moveSouth = function() {
  if (this.y <= 460) {
    this.y = this.y + 1;
  };
}

Plane.prototype.moveEast = function() {
  if (this.x < 730) {
    this.x = this.x + 1;
  } else {
    this.x = -30;
  }
}

Plane.prototype.moveWest = function() {
  if (this.x > -29) {
    this.x = this.x - 1;
  } else {
    this.x = 730;
  };
}

module.exports = Plane;
