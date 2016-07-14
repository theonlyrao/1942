class ComputerPlane {
  constructor() {
  }
}

ComputerPlane.prototype.move = function() {
  this.y = this.y + 1;
  if (this.heading === 0){
    this.moveWest(1);
  } else {
    this.moveEast(1);
  }
};

module.exports = ComputerPlane;
