var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');

var x = 30;
var y = 10;
var width = 8;
var height = 25;
var wingspan = 52;
var tailspan = 16;
var xMid = x + (width/2);
context.fillStyle="red";
// fuselage
context.fillRect(x, y, width, height);
// wings
context.moveTo(xMid - (wingspan/2), 23);
context.lineTo(xMid, 15);
context.lineTo(xMid + (wingspan/2), 23);
context.fill();
// nose
context.moveTo(x, y);
context.lineTo(xMid, y - 5);
context.lineTo(x + width, y);
context.fill();
// fuselage-tail connector
context.moveTo(x, y + height);
context.lineTo(xMid, y + height + 5);
context.lineTo(x + width, y + height);
context.fill();
// tail
context.moveTo(xMid - (tailspan/2), 42);
context.lineTo(xMid, 35);
context.lineTo(xMid + (tailspan/2), 42);
context.fill();
