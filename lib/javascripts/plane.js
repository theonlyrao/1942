const Bullet = require('./bullet');

function Plane(options) {
  if (options.type === "player") {
    this.type = options.type
    this.x = options.x || 350;
    this.y = options.y || 410;
    this.score = 0
    this.status = "alive"
    this.width = options.width || 8;
    this.height = options.height || 25;
    this.wingspan = options.wingspan || 52;
    this.tailspan = options.tailspan || 16;
    //this.border = border(this);
    this.border = [];
    this.bullets = [];
  } else if (options.type === "computer") {
    this.type = options.type
    this.x = options.x || Math.floor(Math.random() * 600) + 50;
    this.y = options.y || -30;
    this.status = "alive"
    this.width = options.width || 8;
    this.height = options.height || 25;
    this.wingspan = options.wingspan || 52;
    this.tailspan = options.tailspan || 16;
    this.heading = Math.floor(Math.random() * (2));
    //this.border = border(this);
    this.border = [];
    this.bullets = [];
  }
};

Plane.prototype.fire = function(){
  let bullet = new Bullet(this);
  this.bullets.push(bullet);
  return bullet;
}

//var border = function(plane){
Plane.prototype.makeBorder = function(){
  let plane = this;
  let points = [];
  let x = plane.x;
  let y = plane.y;
  let width = plane.width;
    let height = plane.height;
    let xMid = plane.x + (plane.width/2);

  for (let a = x; a < x + width; a = a + 2) {

    points.push([a, y])
  }
  // fill it with pairs from top right to bottom right
  for (let b = y + 1; b < y + height; b = b + 2) {
    points.push([x + width - 1, b])
  }

  // fill it with pairs from bottom right to bottom left
  for (let c = x + width - 2; c > x; c = c - 2) {
    points.push([c, y + height - 1])
  }

  // fill it with pairs from bottom left back to top left
  for (let d = y + height - 1; d > y; d = d - 2) {
    points.push([x, d])
  }

    // fill it with pairs from bottom of the wing
    if (plane.type === "computer"){
	for (let e = xMid - plane.wingspan/2; e < xMid + plane.wingspan/2; e = e + 2){
	    if (e != x && e != x + width + 1){
		points.push([e, y + 5])
	    }
	}
    } else if (plane.type === "player"){
	for (let e = xMid - plane.wingspan/2; e < xMid + plane.wingspan/2; e = e + 2){
	    if (e != x && e != x + width + 1){
		points.push([e, y + 13])
	    }
	}
    }

  return points;
}

Plane.prototype.move = function(){
  this.y = this.y + 1;
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

Plane.prototype.increaseScore = function() {
  this.score = this.score + 100
  console.log(this.score)
}

Plane.prototype.destroy = function() {
  this.status = "dead"
}

module.exports = Plane;
