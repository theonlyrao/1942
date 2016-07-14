class Border {
  constructor() {
  }
}

Border.prototype.rectangle = function(){
  this.border = [];
  // fill plane fuselage with coordinates from top left to top right
  fillLine(this.width + 1,this,this.x,this.y,2,"horiz");
  // fill plane fuselage with coordinates from top right to bottom right
  fillLine(this.height,this,this.x + this.width,this.y + 1,2,"vert");
  // fill plane fuselage with coordinates from bottom right to bottom left
  fillLine(this.width,this,this.x + this.width - 1,this.y + this.height,-2,"horiz");
  // fill plane fuselage with coordinates from bottom right to top right
  fillLine(this.height - 1,this,this.x,this.y + this.height - 1,-2,"vert");
};

function fillLine(length,object,xValue,yValue,posValue,direction) {
  for (let i = 0; i < length; i = i + 2) {
    object.border.push([xValue, yValue]);
    if (direction === "horiz") {
      xValue = xValue + posValue;
    } else if (direction === "vert") {
      yValue = yValue + posValue;
    }
  }
}

Border.prototype.planeWings = function () {
  for (let e = this.xMid() - this.wingspan/2; e < this.xMid() + this.wingspan/2; e = e + 2){
    if (e !== this.x && e !== this.x + this.width){
      this.border.push([e, this.y + this.yMid]);
    }
  }
};

module.exports = Border;
