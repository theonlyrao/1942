const CollisionDetector = require('./collision_detector')
var detector = new CollisionDetector();

function GameEngine() {
};
let fireCounter = 0

GameEngine.prototype.takeComputerTurn = function(computerPlane){
    computerPlane.move();
    if ((fireCounter % 75 === 0 || computerPlane.y === -5)) {
	computerPlane.fire()
    };
}

GameEngine.prototype.moveBullets = function(plane){
    let bullets = plane.bullets
    bullets.forEach(function(bullet){
	if (plane.type === "player") {
	    bullet.y = bullet.y - 3;
	} else if (plane.type === "computer") {
	    bullet.y = bullet.y + 3;
	};
    });
}

GameEngine.prototype.checkPlayerActions = function(playerPlane, otherPlanes) {
    otherPlanes.forEach(function(plane2){
	if (plane2.type === "computer" && detector.check(playerPlane, plane2)){
	    playerPlane.destroy();
	    plane2.destroy();
	    console.log("we have a collision")}

	if (plane2.type === "computer"){
	    playerPlane.bullets.forEach(function(bullet){
		if (detector.check(plane2,bullet)) {
		    console.log("enemy destroyed");
		    playerPlane.increaseScore()
		    plane2.destroy()
		};
	    });
	};
    });
}

GameEngine.prototype.checkComputerActions = function(computerPlane, otherPlanes) {
    otherPlanes.forEach(function(plane2){
	if (plane2.type === "player") {
	    computerPlane.bullets.forEach(function(bullet){
		if (detector.check(plane2,bullet)) {
		    plane2.destroy()
		    console.log("player destroyed")
		};

	    });
	};
    });
}

GameEngine.prototype.animate = function(planes) {
    fireCounter++
    let game = this;
    planes.forEach(function(plane1){
	game.moveBullets(plane1);
	if (plane1.type === "computer" && plane1.status == "alive") {game.takeComputerTurn(plane1)};
	if (plane1.type === "player") {game.checkPlayerActions(plane1, planes);}
	if (plane1.type === "computer"){game.checkComputerActions(plane1, planes)};
    });
};


module.exports = GameEngine;
