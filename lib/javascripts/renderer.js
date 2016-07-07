function Renderer(options) {
  this.canvas = options.canvas;
  this.context = options.context;
};

Renderer.prototype.drawPlanes = function(planes) {
  var context = this.context
  planes.forEach(function(plane){
    context.fillStyle = "red";
    var xMid = plane.x + (plane.width/2);
    // fuselage
    context.fillRect(plane.x, plane.y, plane.width, plane.height);
    // wings
    context.beginPath();
    context.moveTo(xMid - (plane.wingspan/2), plane.y + 13);
    context.lineTo(xMid, plane.y + 5);
    context.lineTo(xMid + (plane.wingspan/2), plane.y + 13);
    context.fill();
    // nose
    context.moveTo(plane.x, plane.y);
    context.lineTo(xMid, plane.y - 5);
    context.lineTo(plane.x + plane.width, plane.y);
    context.fill();
    // fuselage-tail connector
    context.moveTo(plane.x, plane.y + plane.height);
    context.lineTo(xMid, plane.y + plane.height + 5);
    context.lineTo(plane.x + plane.width, plane.y + plane.height);
    context.fill();
    // tail
    context.moveTo(xMid - (plane.tailspan/2), plane.y + 32);
    context.lineTo(xMid, plane.y + 25);
    context.lineTo(xMid + (plane.tailspan/2), plane.y + 32);
    context.fill();
    return this;
  })
};

module.exports = Renderer;
