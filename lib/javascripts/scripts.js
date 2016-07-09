const Plane = require('./plane');
const Renderer = require('./renderer');
const CollisionDetector = require('./collision_detector')

var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');
var playerPlane = new Plane({type: "player"});
var smallComputerPlane = new Plane({type: "computer"});
var renderer = new Renderer({context: context, canvas: canvas});
var detector = new CollisionDetector();
var planes = [playerPlane,smallComputerPlane]

requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0,canvas.width, canvas.height);
    renderer.drawPlanes(planes);
    renderer.drawBullets(context, planes);
    smallComputerPlane.move();
    planes.forEach(function(plane){
	plane.bullets.forEach(function(bullet){
	    if(plane.type === "player"){
		bullet.y--;
		if (detector.check(bullet, smallComputerPlane)){
		    console.log("computer plane destroyed")
		}
	    }
	})
    })
    /* console.log("computer: " + smallComputerPlane.border[0])
     * console.log("player: " + playerPlane.border[0])*/
    let result = detector.check(playerPlane, smallComputerPlane)
    if (result === true){
	console.log("we have a collision")
    }
    requestAnimationFrame(gameLoop);
});

var map = [];
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

document.addEventListener("keypress",function(event) {
    if (map[87] === true ) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveNorth();
	};
    };
    if (map[68] === true) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveEast();
	};
    };
    if (map[83] === true) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveSouth();
	};
    };
    if(map[65] === true) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveWest();
	};
    };
    if(map[32] === true){
	playerPlane.fire();
    }

});
