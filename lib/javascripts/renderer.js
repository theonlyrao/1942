function Renderer(options) {
  this.canvas = options.canvas;
  this.context = options.context;
}

Renderer.prototype.drawBullets = function(context, planes){
  planes.forEach(function(plane){
    plane.bullets.forEach(function(bullet){
      if(bullet.status === "alive"){
        context.fillStyle = "#E6DE70";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.border = bullet.makeBorder();
      }
    });
  });
};

Renderer.prototype.nextLevelScreen = function(){
  this.context.fillStyle = "#DCDFE0";
  this.context.font = "bold 30px Arial";
  this.context.fillText("Next Level", 250, 150);
};

Renderer.prototype.drawPlanes = function(planes) {
  let context = this.context;
  planes.forEach(function(plane){
      plane.rectangle();
      plane.planeWings();
      let img = new Image();
      if (plane.type === "player" && plane.class === "small") {
	  img.src = "lib/player_plane.svg";
	  context.drawImage(img, plane.x - 22, plane.y - 5, 500, 500);
      } else if (plane.type === "computer" && plane.class === "small") {
	  img.src = "lib/computer_plane.svg";
	  context.drawImage(img, plane.x - 22, plane.y - 35, 500, 500);
      } else if (plane.class === "boss") {
	  img.src = "lib/computer_plane.svg";
	  context.drawImage(img, plane.x - 90, plane.y - 115, 2000, 2000);
	  context.fillStyle = "#C41010";
	  context.font = "bold 16px Arial";
	  context.fillText("Boss Lives: " + String(plane.hitCounterLimit - plane.hitCounter), 575, 485);
      }
  });
};

Renderer.prototype.stats = function(player, level) {
  this.context.fillStyle = "#DCDFE0";
  this.context.font = "bold 16px Arial";
  this.context.fillText("Score: " + player.score, 10, 20);
  this.context.fillText("Lives: " + String(player.hitCounterLimit - player.hitCounter), 10, 485);
  this.context.fillText("High Score: " + localStorage.highScore, 250, 20);
  this.context.fillText("Level: " + level.number, 625, 20);
};

Renderer.prototype.startScreen = function() {
  this.context.fillStyle = "#DCDFE0";
  this.context.font = "bold 30px Arial";
  this.context.fillText("Press Enter To Start", 230, 180);
};

Renderer.prototype.endScreen = function(player) {
  this.context.fillStyle = "#DCDFE0";
  this.context.font = "bold 16px Arial";
  this.context.fillText("Score: " + player.score, 10, 20);
  this.context.fillText("Lives: " + String(player.hitCounterLimit - player.hitCounter), 10, 485);
  this.context.font = "bold 30px Arial";
  this.context.fillText("Game Over", 230, 150);
};

module.exports = Renderer;
