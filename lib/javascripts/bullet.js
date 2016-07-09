function Bullet(plane) {
  this.x = plane.x + plane.width/2
  if (plane.type === "player"){
    this.y = plane.y - 3
  } else if (plane.type === "computer"){
    this.y = plane.y + 3
  }
  this.status = "alive"
  this.width = 2;
  this.height = 3;
  this.type = plane.type
  this.border = [];
};

Bullet.prototype.makeBorder = function(){
  let points = [[this.x, this.y],[this.x + 1, this.y],
  [this.x, this.y + 1],[this.x + 1, this.y + 1],
  [this.x, this.y + 2],[this.x + 1, this.y + 2]]
  return points;
}

module.exports = Bullet;
