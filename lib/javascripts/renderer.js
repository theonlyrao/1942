function Renderer(options) {
  this.canvas = options.canvas;
  this.context = options.context;
};

Renderer.prototype.drawPlanes = function(plane) {
  this.context.fillStyle = "red";
  var xMid = plane.x + (plane.width/2);
  // fuselage
  this.context.fillRect(plane.x, plane.y, plane.width, plane.height);
  // wings
  this.context.beginPath();
  this.context.moveTo(xMid - (plane.wingspan/2), plane.y + 13);
  this.context.lineTo(xMid, plane.y + 5);
  this.context.lineTo(xMid + (plane.wingspan/2), plane.y + 13);
  this.context.fill();
  // nose
  this.context.moveTo(plane.x, plane.y);
  this.context.lineTo(xMid, plane.y - 5);
  this.context.lineTo(plane.x + plane.width, plane.y);
  this.context.fill();
  // fuselage-tail connector
  this.context.moveTo(plane.x, plane.y + plane.height);
  this.context.lineTo(xMid, plane.y + plane.height + 5);
  this.context.lineTo(plane.x + plane.width, plane.y + plane.height);
  this.context.fill();
  // tail
  this.context.moveTo(xMid - (plane.tailspan/2), plane.y + 32);
  this.context.lineTo(xMid, plane.y + 25);
  this.context.lineTo(xMid + (plane.tailspan/2), plane.y + 32);
  this.context.fill();
  return this;
};

module.exports = Renderer;
