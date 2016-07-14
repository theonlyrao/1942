const CollisionDetector = require('./collision_detector');
var detector = new CollisionDetector();

function GameEngine() {
}

let fireCounter = 0;

GameEngine.prototype.takeComputerTurn = function(computerPlane){
  computerPlane.move();
  if (computerPlane.y > 510){
    computerPlane.destroy();
  }
  if ((fireCounter % 75 === 0 || computerPlane.y === -5)) {
    computerPlane.fire();
  }
};

GameEngine.prototype.moveBullets = function(plane){
  let bullets = plane.bullets.filter(function(bullet){
    if(bullet.status === "alive"){
      return true;
    }
  });
  bullets.forEach(function(bullet){
    if (plane.type === "player") {
      bullet.y = bullet.y - 3;
    } else if (plane.type === "computer") {
      bullet.y = bullet.y + 3;
    }
    if (bullet.y > 510 ){
      bullet.destroy();
    }
  });
};

GameEngine.prototype.checkPlayerActions = function(playerPlane, otherPlanes) {
  otherPlanes.forEach(function(plane2){
    if (plane2.type === "computer" && detector.check(playerPlane, plane2)){
      playerPlane.hitCounter = 0;
      playerPlane.destroy();
      plane2.destroy();
    }

    if (plane2.type === "computer" && playerPlane.bullets.length > 0){
      playerPlane.bullets.forEach(function(bullet){
        if (detector.check(plane2,bullet)) {
          playerPlane.increaseScore();
          plane2.hitCounter++;
          bullet.destroy();
        }
      });
    }
  });
};


GameEngine.prototype.checkComputerActions = function(computerPlane, planes) {
  if (computerPlane.bullets.length > 0){
    planes.forEach(function(plane){
      if (plane.type === "player" ){
        computerPlane.bullets.forEach(function(bullet){
          if (detector.check(plane,bullet)) {
            plane.hitCounter++;
            bullet.destroy();
          }
        });
      }
    });
  }
};

GameEngine.prototype.animate = function(planes) {
  fireCounter++;
  let game = this;
  planes.forEach(function(plane1){
    game.moveBullets(plane1);
    if (plane1.hitCounter === plane1.hitCounterLimit) { plane1.destroy(); }
    if (plane1.type === "computer" && plane1.status === "alive") {game.takeComputerTurn(plane1);}
    if (plane1.type === "player") {game.checkPlayerActions(plane1, planes);}
    if (plane1.type === "computer"){game.checkComputerActions(plane1, planes);}
  });
};

module.exports = GameEngine;
