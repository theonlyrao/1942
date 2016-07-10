const Plane = require('./plane');
const Renderer = require('./renderer');
const GameEngine = require('./game_engine')
const $ = require('jQuery');


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

function repeatCallback(key) {
  if (key === 87) {
    for (let i = 0; i < 7; i++) {
      playerPlane.moveNorth();
    };
  };
  if (key === 83) {
    for (let i = 0; i < 7; i++) {
      playerPlane.moveSouth();
    };
  };
  if(key === 65) {
    for (let i = 0; i < 7; i++) {
      playerPlane.moveWest();
    };
  };
  if(key === 32){
    if (counter === 0) {
      counter = 1;
      playerPlane.fire();
    };
  }
  if (key === 68) {
    for (let i = 0; i < 7; i++) {
      playerPlane.moveEast();
    };
  };
  if(key === 13){
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
