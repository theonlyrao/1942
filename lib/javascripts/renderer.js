let canvas = document.getElementById('nineteenfortytwo');
let context = canvas.getContext('2d');

function Renderer(options) {
  this.canvas = options.canvas;
  this.context = options.context;
};

Renderer.prototype.drawBullets = function(context, planes){
  planes.forEach(function(plane){
    plane.bullets.forEach(function(bullet){
      if(bullet.status === "alive"){
        context.fillStyle = "red";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.border = bullet.makeBorder();
      }
    })
  })
}

function drawFuselage(context,plane) {
  context.fillRect(plane.x, plane.y, plane.width, plane.height);
}

function drawPlayerWings(xMid,plane) {
  context.beginPath();
  context.moveTo(xMid - (plane.wingspan/2), plane.y + 13);
  context.lineTo(xMid, plane.y + 5);
  context.lineTo(xMid + (plane.wingspan/2), plane.y + 13);
  context.fill();
}

function drawComputerWings(xMid,context,plane) {
  context.moveTo(xMid - (plane.wingspan/2), plane.y + 13);
  context.lineTo(xMid, plane.y + 21);
  context.lineTo(xMid + (plane.wingspan/2), plane.y + 13);
  context.fill();
}

function drawBossComputerWings(xMid,context,plane) {
  context.moveTo(xMid - (plane.wingspan/2), plane.y + 17);
  context.lineTo(xMid, plane.y + 35);
  context.lineTo(xMid + (plane.wingspan/2), plane.y + 17);
  context.fill();
}

function drawNorthTriangle(xMid,context,plane) {
  context.moveTo(plane.x, plane.y);
  context.lineTo(xMid, plane.y - 5);
  context.lineTo(plane.x + plane.width, plane.y);
  context.fill();
}

function drawSouthTriangle(xMid,context,plane) {
  context.moveTo(plane.x, plane.y + plane.height);
  context.lineTo(xMid, plane.y + plane.height + 5);
  context.lineTo(plane.x + plane.width, plane.y + plane.height);
  context.fill();
}

function drawPlayerTail(xMid,context,plane) {
  context.moveTo(xMid - (plane.tailspan/2), plane.y + 32);
  context.lineTo(xMid, plane.y + 25);
  context.lineTo(xMid + (plane.tailspan/2), plane.y + 32);
  context.fill();
}

function drawComputerTail(xMid,context,plane) {
  context.moveTo(xMid - (plane.tailspan/2), plane.y - 7);
  context.lineTo(xMid, plane.y);
  context.lineTo(xMid + (plane.tailspan/2), plane.y - 7);
  context.fill();
}

Renderer.prototype.drawPlanes = function(planes) {
  var context = this.context
  planes.forEach(function(plane){
    plane.rectangle();
    plane.planeWings()
    context.fillStyle = "red";
    var xMid = plane.x + (plane.width/2);
    context.beginPath();
    drawFuselage(context,plane)
    drawNorthTriangle(xMid,context,plane)
    drawSouthTriangle(xMid,context,plane)

    if (plane.type === "player" && plane.class === "small") {
      context.fillStyle = 'purple';
      drawPlayerWings(xMid,plane)
      drawPlayerTail(xMid,context,plane)
    } else if (plane.type === "computer" && plane.class === "small") {
      context.fillStyle = 'green';
      drawComputerWings(xMid,context,plane)
      drawComputerTail(xMid,context,plane)
    } else if (plane.class === "boss") {
      context.fillStyle = 'orange';
      drawBossComputerWings(xMid,context,plane)
      drawComputerTail(xMid,context,plane)
      context.fillStyle = "red";
      context.font = "bold 16px Arial";
      context.fillText("Boss Lives: " + String(plane.hitCounterLimit - plane.hitCounter), 575, 485);
    }
  })
};

Renderer.prototype.stats = function(player) {
    this.context.fillStyle = "blue";
    this.context.font = "bold 16px Arial";
    this.context.fillText("Score: " + player.score, 10, 20);
    this.context.fillText("Lives: " + String(player.hitCounterLimit - player.hitCounter), 10, 485);
    this.context.fillText("High Score: " + localStorage.highScore, 250, 20);
}

Renderer.prototype.startScreen = function() {
  this.context.fillStyle = "blue";
  this.context.font = "bold 30px Arial";
  this.context.fillText("Press Enter To Start", 250, 150);
}

Renderer.prototype.endScreen = function(player) {
  this.context.fillStyle = "blue";
  this.context.font = "bold 16px Arial";
  this.context.fillText("Score: " + player.score, 10, 20);
  this.context.fillText("Lives: " + String(player.hitCounterLimit - player.hitCounter), 10, 485);
  this.context.font = "bold 30px Arial";
  this.context.fillText("Game Over", 250, 150);
};

module.exports = Renderer;
