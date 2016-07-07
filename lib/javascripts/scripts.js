const Plane = require('./plane');
const Renderer = require('./renderer');

var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');
var playerPlane = new Plane({type: "player"});
var renderer = new Renderer({context: context, canvas: canvas});

// function gameLoop() {
//   var game = this;
//   // context.clearRect(0,0,canvas.width, canvas.height);
//   renderer.drawPlanes(playerPlane);
//   requestAnimationFrame(gameLoop.bind(game))
//
// }


// function gameLoop() {
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0,canvas.width, canvas.height);
    renderer.drawPlanes(playerPlane);
    requestAnimationFrame(gameLoop);
  });



window.onkeydown = window.onkeyup = function(e) {

  var map = [];
  e = e || event;
  map[e.keyCode] = e.type == 'keydown';
  if (map[87] === true ) {
    playerPlane.moveNorth();
  }
  if (map[68] === true) {
    playerPlane.moveEast();
  }
  if (map[83] === true) {
    playerPlane.moveSouth();
  }
  if(map[65] === true) {
    playerPlane.moveWest();
  }
};

//
// playersPlane.draw("purple")
