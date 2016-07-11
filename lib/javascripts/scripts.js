const Plane = require('./plane');
const Renderer = require('./renderer');
const GameEngine = require('./game_engine')
const $ = require('jQuery');


var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');
let planes = []

let computerPlaneFeeder = 0
let playerPlane = new Plane({type: "player"});
planes.push(playerPlane);

function computerPlanes() {
    let speed = Math.floor(Math.random() * (500 - 300) + 300);
    if (computerPlaneFeeder % speed === 0) {
	var smallComputerPlane = new Plane({type: "computer"});
	planes.push(smallComputerPlane);
    };
}

var renderer = new Renderer({context: context, canvas: canvas});

let gameEngine = new GameEngine()

let counter = 0
let startGame = false

requestAnimationFrame(function gameLoop() {
    if (startGame === false) {
	renderer.startScreen()
    } else if (playerPlane.status === "dead") {
	renderer.endScreen(playerPlane)
    } else {
	computerPlanes()
	computerPlaneFeeder++
	if (counter > 0 && counter < 20) {
	    counter++;
	} else if (counter === 20) {
	    counter = 0;
	};
	context.clearRect(0,0,canvas.width, canvas.height);

	let livePlanes = planes.filter(function(plane){
	    if(plane.status == "alive"){
		return true
	    }
	})
	renderer.drawPlanes(livePlanes);
	renderer.drawBullets(context, planes);
	renderer.score(playerPlane);
	gameEngine.animate(planes);
    };
    requestAnimationFrame(gameLoop);
});

function repeatCallback(key) {

    if (key === 87) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveNorth();
	};
    } else if (key === 83) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveSouth();
	};
    } else if (key === 65) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveWest();
	};
    } else if(key === 32){
	if (counter === 0) {
	    counter = 1;
	    playerPlane.fire();
	};
    } else if(key === 68) {
	for (let i = 0; i < 7; i++) {
	    playerPlane.moveEast();
	};
    } else if(key === 13){
	startGame = true
    }

}

var repeatState = {};
$(document.body).keydown(function(e) {
    var key = e.which;
    if (!repeatState[key]) {
	repeatState[key] = setInterval(function() {
	    repeatCallback(key);
	}, 35);
    } else {
    }
}).keyup(function(e) {
    var key = e.which;
    var timer = repeatState[key];
    if (timer) {
	clearInterval(timer);
	delete repeatState[key];
    }
});
