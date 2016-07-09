const Plane = require('./plane');
const Renderer = require('./renderer');
const GameEngine = require('./game_engine')

var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');
var playerPlane = new Plane({type: "player"});
var smallComputerPlane = new Plane({type: "computer"});
var renderer = new Renderer({context: context, canvas: canvas});

let gameEngine = new GameEngine()
var planes = [playerPlane,smallComputerPlane]
let counter = 0
let startGame = false

requestAnimationFrame(function gameLoop() {
  if (startGame === false) {
    renderer.startScreen()
  } else if (playerPlane.status === "dead") {
    renderer.endScreen(playerPlane)

  } else {
    if (counter > 0 && counter < 20) {
      counter++;
    } else if (counter === 20) {
      counter = 0;
    };
    context.clearRect(0,0,canvas.width, canvas.height);
    renderer.drawPlanes(planes);
    renderer.drawBullets(context, planes);
    renderer.score(playerPlane);
    gameEngine.animate(planes);
  };
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
    if (counter === 0) {
      counter = 1;
      playerPlane.fire();
    };
  }
  if(map[13] === true){
    startGame = true
  }

});
