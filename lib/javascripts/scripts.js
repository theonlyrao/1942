const Plane = require('./plane');
const Renderer = require('./renderer');
var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');
var playerPlane = new Plane({type: "player"});
var smallComputerPlane = new Plane({type: "computer"});
var renderer = new Renderer({context: context, canvas: canvas});
var planes = [playerPlane,smallComputerPlane]

requestAnimationFrame(function gameLoop() {
    context.clearRect(0,0,canvas.width, canvas.height);
    renderer.drawPlanes(planes);
    smallComputerPlane.move();    
    requestAnimationFrame(gameLoop);
});

var map = [];
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

document.addEventListener("keypress",function(event) {
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

});
