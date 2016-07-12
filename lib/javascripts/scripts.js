const SmallComputerPlane = require('./planes/small_computer_plane');
const BossComputerPlane = require('./planes/boss_computer_plane');
const SmallPlayerPlane = require('./planes/small_player_plane');
const Renderer = require('./renderer');
const GameEngine = require('./game_engine')
const $ = require('jQuery');

let canvas = document.getElementById('nineteenfortytwo');
let context = canvas.getContext('2d');
let planes = []

let computerPlaneFeeder = 0
let bossCount = 0
let playerPlane = new SmallPlayerPlane({type: "player"});
let bossComputerPlane = new BossComputerPlane({type: "computer"});
planes.push(playerPlane);

function computerPlanes() {
  let speed = Math.floor(Math.random() * (500 - 300) + 300);
  if (playerPlane.score >= 1000 && bossCount !== 1) {
    bossCount++
    planes.push(bossComputerPlane);
  } else if (computerPlaneFeeder > speed && bossCount !== 1) {
    computerPlaneFeeder = 0;
    let smallComputerPlane = new SmallComputerPlane({type: "computer"});
    planes.push(smallComputerPlane);
  };
}

let renderer = new Renderer({context: context, canvas: canvas});
let gameEngine = new GameEngine()
let counter = 0
let startGame = false

requestAnimationFrame(function gameLoop() {
  if (startGame === false) {
    renderer.startScreen()
  } else if (playerPlane.status === "dead" || bossComputerPlane.status === "dead") {
    renderer.endScreen(playerPlane)
  } else {
    computerPlanes()
    computerPlaneFeeder++
    counter++;
    context.clearRect(0,0,canvas.width, canvas.height);
    let livePlanes = planes.filter(function(plane){
      if(plane.status == "alive"){
        return true
      }
    })
    renderer.stats(playerPlane);
    renderer.drawPlanes(livePlanes);
    gameEngine.animate(planes);
    renderer.drawBullets(context, planes);
  };
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
  } else if(key === 32 && counter >= 30){
    counter = 0;
    playerPlane.fire();
  } else if(key === 13){
    startGame = true
  };
};

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
