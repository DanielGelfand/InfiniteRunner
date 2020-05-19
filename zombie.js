let zombieImage = new Image();
zombieImage.src = "images/zombie.png"

function Zombie() {
  this.x = pipes[Math.floor(Math.random() * (pipes.length-1)) + 1].x + 100;
  this.y = 190;

  this.draw = function() {
    ctx.drawImage(zombieImage,this.x,this.y,60,80);
  }

  this.move = function() {
    this.x -= 6;
  }

  this.contactsRunner = function() {
    return Math.abs(this.x - runner.x) <= 20;
  }

  /*function validSpot() {
    for (let i; i < pipes.length; i++) {
      if (Math.abs(pipes[i].x - this.x) <= 20) {

      }
    }
  }*/
}
