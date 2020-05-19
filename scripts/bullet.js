let bulletImage = new Image();
bulletImage.src = "images/laserBullet.png"

function Bullet() {
  this.x = 20;
  this.y = 230;
  this.xVel = 0;
  this.yVel = 0;
  this.hitZombie = false;

  this.move = function() {
    this.x += this.xVel;
  }

  this.draw = function() {
    ctx.drawImage(bulletImage,this.x,this.y,20,20);
  }

  this.contactsZombie = function(zombie) {
    return Math.abs(this.x -zombie.x) <= 20;
  }
}
