const CollisionDetector = require('./collision_detector')
var detector = new CollisionDetector();

function GameEngine() {
};
let fireCounter = 0

GameEngine.prototype.animate = function(planes) {
  fireCounter++
  planes.forEach(function(plane1){
    let bullets = plane1.bullets
    if (plane1.type === "computer") {
      plane1.move();
      if (fireCounter % 75 === 0 || plane1.y === -5) {
        plane1.fire()
      };
    };

    plane1.bullets.forEach(function(bullet){
      if (plane1.type === "player") {
        bullet.y = bullet.y - 3;
      } else if (plane1.type === "computer") {
        bullet.y = bullet.y + 3;
      };
    });

    if (plane1.type === "player") {
      planes.forEach(function(plane2){
        if (plane2.type === "computer" && detector.check(plane1, plane2)){
          console.log("we have a collision")
        };

        if (plane2.type === "computer") {
          bullets.forEach(function(bullet){
            if (detector.check(plane2,bullet)) {
              console.log("enemy destroyed")
            };
          });
        };
      });
    } else if (plane1.type === "computer"){
      planes.forEach(function(plane2){
        if (plane2.type === "player") {
          bullets.forEach(function(bullet){
            if (detector.check(plane2,bullet)) {
              console.log("player destroyed")
            };

          });
        };
      });
    };

  });


};
module.exports = GameEngine;
