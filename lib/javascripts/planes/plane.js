const Bullet = require('../bullet');
const Border = require('../border');

class Plane extends Border {
  constructor(options) {
    super(options);
    this.bullets = [];
    this.type = options.type;
    this.explodeTimer = 60;
    this.hitCounter = 0;
    this.status = "alive";
    this.typeSpecificDimensions();
  }
}

Plane.prototype.fire = function(){
  let bullet = new Bullet(this);
  this.bullets.push(bullet);
  return bullet;
};

Plane.prototype.xMid = function(){
  return this.x + (this.width/2);
};

Plane.prototype.moveNorth = function(num) {
  for (let i = 0; i < num; i++) {
    if (this.y > 20) {
      this.y = this.y - 1;
    }
  }
};

Plane.prototype.moveSouth = function(num) {
  for (let i = 0; i < num; i++) {
    if (this.y < 460) {
      this.y = this.y + 1;
    }
  }
};

Plane.prototype.moveEast = function(num) {
  for (let i = 0; i < num; i++) {
    if (this.x < 730) {
      this.x = this.x + 1;
    } else {
      this.x = -30;
    }
  }
};

Plane.prototype.moveWest = function(num) {
  for (let i = 0; i < num; i++) {
    if (this.x > -29) {
      this.x = this.x - 1;
    } else {
      this.x = 730;
    }
  }
};

Plane.prototype.destroy = function() {
  this.status = "dead";
};

module.exports = Plane;
