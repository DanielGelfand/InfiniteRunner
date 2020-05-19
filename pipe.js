let pipeImage = new Image();
pipeImage.src = "spike.png"

function Pipe() {
  this.x = Math.floor(Math.random() * (800 - 700) + 700);
  this.y = 230;

  this.draw = function() {
    ctx.drawImage(pipeImage,this.x,this.y,30,40);
  }
  this.move = function() {
    this.x -= 6;
  }

  this.contactsRunner = function() {
    return Math.abs(runner.x - this.x) < 40  && runner.y >= 190;
  }
}
