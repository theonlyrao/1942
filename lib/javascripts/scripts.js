const SmallPlayerPlane = require('./planes/small_player_plane');
const Level = require('./level');
const Renderer = require('./renderer');
const GameEngine = require('./game_engine');
const $ = require('jQuery');

let canvas = document.getElementById('nineteenfortytwo');
const context = canvas.getContext('2d');

let renderer = new Renderer({context: context, canvas: canvas});
let gameEngine = new GameEngine();
let fireCounter = 0;
let intermissionCounter = 0;
let startGame = false;
let playerPlane = new SmallPlayerPlane({type: "player"});
let level = new Level();
let planes = [playerPlane];

localStorage.highScore = localStorage.highScore || 0;

requestAnimationFrame(function gameLoop() {
  localStorage.highScore = Math.max(localStorage.highScore, playerPlane.score);
  if (startGame === false) {
    renderer.startScreen();
  } else if (playerPlane.status === "dead") {
    renderer.endScreen(playerPlane);
    startGame = false;
    playerPlane = new SmallPlayerPlane({type: "player"});
    level = new Level();
    planes = [playerPlane];
  } else if (level.bossPlane && level.bossPlane.status === "dead") {
    renderer.nextLevelScreen();
    intermissionCounter++;
    if (intermissionCounter === 200) {
      planes = [playerPlane];
      level.nextLevel();
      intermissionCounter = 0;
    }
  } else {
    context.clearRect(0,0,canvas.width, canvas.height);
    planes = planes.concat(level.makePlanes());
    fireCounter++;
    let livePlanes = planes.filter(function(plane){
      if(plane.status === "alive"){
        return true;
      }
    });
    renderer.stats(playerPlane,level);
    renderer.drawPlanes(livePlanes);
    gameEngine.animate(planes);
    renderer.drawBullets(context, planes);
  }

  requestAnimationFrame(gameLoop);
});

function repeatCallback(key) {
  if (key === 87) {
    playerPlane.moveNorth(1);
  } else if (key === 83) {
    playerPlane.moveSouth(1);
  } else if (key === 65) {
    playerPlane.moveWest(1);
  } else if(key === 68) {
    playerPlane.moveEast(1);
  } else if(key === 32 && fireCounter >= 30){
    fireCounter = 0;
    playerPlane.fire();
  } else if(key === 13){
    startGame = true;
  }
}

var repeatState = {};
$(document.body).keydown(function(e) {
  var key = e.which;
  if (!repeatState[key]) {
    repeatState[key] = setInterval(function() {
      repeatCallback(key);
    }, 8);
  }
}).keyup(function(e) {
  var key = e.which;
  var timer = repeatState[key];
  if (timer) {
    clearInterval(timer);
    delete repeatState[key];
  }
});
