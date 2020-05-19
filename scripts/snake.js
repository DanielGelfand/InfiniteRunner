function Snake() {
  this.x = 0;
  this.y = 0;
  this.xVel = 1;
  this.yVel = 0;
  this.tail = [];
  this.totalLen = 0;

  this.draw = function(ctx) {
    ctx.fillStyle = "#FFFFFF";
    for(let i = 0; i < this.tail.length; i+=1) {
      ctx.fillRect(this.tail[i].x,this.tail[i].y,10,10)
    }
    ctx.fillRect(this.x,this.y,10,10);
  }
}
