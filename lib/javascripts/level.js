const SmallComputerPlane = require('./planes/small_computer_plane');
const BossComputerPlane = require('./planes/boss_computer_plane');

class Level  {
  constructor() {
    this.number = 1;
  };
};

Level.prototype.nextLevel = function() {
  this.number++;
};

Level.prototype.makePlanes = function() {
  let computerPlanes = []

  for (let i = 0; i < 6 + this.number;i++) {
    let smallPlane = new SmallComputerPlane({type: "computer"});
    computerPlanes.push(smallPlane);
  };

  let bossPlane = new BossComputerPlane({type: "computer"});
  computerPlanes.push(bossPlane);

  return computerPlanes
};

module.exports = Level;
