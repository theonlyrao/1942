const SmallComputerPlane = require('./planes/small_computer_plane');
const BossComputerPlane = require('./planes/boss_computer_plane');

class Level  {
  constructor() {
    this.number = 1;
    this.releaseSpeed = 300;
    this.smallPlaneCount = 0;
    this.bossPlane = false;
  }
}

Level.prototype.nextLevel = function() {
  this.number++;
  this.smallPlaneCount = 0;
  this.bossPlane = false;
  this.releaseSpeed = this.releaseSpeed - 15;
  releaseCounter = 0;
};

let releaseCounter = 0;

Level.prototype.makePlanes = function() {
  let computerPlanes = [];
  releaseCounter++;
  if (releaseCounter >= this.releaseSpeed && this.smallPlaneCount < 1 + this.number) {
    this.smallPlaneCount++;
    releaseCounter = 0;
    let smallPlane = new SmallComputerPlane({type: "computer"});
    computerPlanes.push(smallPlane);
  } else if (this.smallPlaneCount === 1 + this.number && this.bossPlane === false ) {
    let bossPlane = new BossComputerPlane({type: "computer"});
    this.bossPlane = bossPlane;
    computerPlanes.push(bossPlane);
  }
  return computerPlanes;
};

module.exports = Level;
