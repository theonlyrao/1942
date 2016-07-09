function Bullet(options) {
    this.x = options.x + options.width/2
    if (options.type === "player"){
	this.y = options.y - 3
    } else if (options.type === "computer"){
	this.y = options.y + 3
    }
    this.width = 2;
    this.height = 2;
    this.type = options.type
    this.border = [];
};

Bullet.prototype.makeBorder = function(){
    let points = [[this.x, this.y],[this.x + 1, this.y],
		  [this.x, this.y + 1],[this.x + 1, this.y + 1]]
    return points;
}

module.exports = Bullet;
