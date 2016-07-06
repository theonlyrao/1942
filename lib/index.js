var canvas = document.getElementById('nineteenfortytwo');
var context = canvas.getContext('2d');

function kidOnTheBlock(x,y,width,height) {
  this.x = x;
  this.y = y;
}

var playersPlane = new kidOnTheBlock(350,495)

kidOnTheBlock.prototype.draw = function(color) {
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillStyle = color;
  context.beginPath();
  var x = this.x
  var y = this.y
  context.moveTo(x,y);
  context.lineTo(x - 15,y - 15);
  context.lineTo(x - 30,y );
  context.closePath()
  context.fill()
  return this;
}

kidOnTheBlock.prototype.moveNorth = function() {
  this.y = this.y - 7;
  this.draw()
}

kidOnTheBlock.prototype.moveEast = function() {
  this.x = this.x + 7;
  this.draw()
}

kidOnTheBlock.prototype.moveSouth = function() {
  this.y = this.y + 7;
  this.draw()
}

kidOnTheBlock.prototype.moveWest = function() {
  this.x = this.x - 7;
  this.draw()
}

var map = [];
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

$(document).keypress(function(event) {
  if (playersPlane.x > 731) {
    playersPlane.x = 0
  } else if (playersPlane.x < -10) {
    playersPlane.x = 730
  }
  if (map[87] === true && playersPlane.y > 20) {
    playersPlane.moveNorth();
  }
  if (map[68] === true) {
    playersPlane.moveEast();
  }
  if (map[83] === true && playersPlane.y < 495) {
    playersPlane.moveSouth();
  }
  if(map[65] === true) {
    playersPlane.moveWest();
  }
});

playersPlane.draw("purple")
