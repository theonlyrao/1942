function Renderer(options) {
  this.canvas = options.canvas;
  this.context = options.context;
};

function drawFuselage(context,plane) {
  context.fillRect(plane.x, plane.y, plane.width, plane.height);
}

function drawPlayerWings(xMid,context,plane) {
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
    context.fillStyle = "red";
    var xMid = plane.x + (plane.width/2);
    context.beginPath();
    drawFuselage(context,plane)
    drawNorthTriangle(xMid,context,plane)
    drawSouthTriangle(xMid,context,plane)

    if (plane.type === "player") {
      drawPlayerWings(xMid,context,plane)
      drawPlayerTail(xMid,context,plane)
    } else if (plane.type === "computer") {
      drawComputerWings(xMid,context,plane)
      drawComputerTail(xMid,context,plane)
    }
  })
};

module.exports = Renderer;
