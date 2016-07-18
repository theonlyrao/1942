class Border {
  constructor() {
  }
}

Border.prototype.rectangle = function(){
  this.border = [];
  // fill plane fuselage with coordinates from top left to top right
  fillLine({length: this.width + 1,object: this,xValue: this.x,yValue: this.y,posValue: 2,direction: "horiz"});
  // fill plane fuselage with coordinates from top right to bottom right
  fillLine({length: this.height,object: this,xValue: this.x + this.width,yValue: this.y + 1,posValue: 2,direction: "vert"});
  // fill plane fuselage with coordinates from bottom right to bottom left
  fillLine({length: this.width,object: this,xValue: this.x + this.width - 1,yValue: this.y + this.height,posValue: -2,direction: "horiz"});
  // fill plane fuselage with coordinates from bottom right to top right
  fillLine({length: this.height - 1,object: this,xValue: this.x,yValue: this.y + this.height - 1,posValue: -2,direction: "vert"});
};

function fillLine(values) {
  for (let i = 0; i < values.length; i = i + 2) {
    values.object.border.push([values.xValue, values.yValue]);
    if (values.direction === "horiz") {
      values.xValue = values.xValue + values.posValue;
    } else if (values.direction === "vert") {
      values.yValue = values.yValue + values.posValue;
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
