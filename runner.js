

function Runner(cycle_loop) {
  this.x = 0;
  this.y = 200;
  this.xVel = 0;
  this.yVel = 0;
  this.cycle_loop = cycle_loop;
  this.currLoopIndex = 0;
  this.verticalFrame = 0;
  this.killer;


  this.jump = function() {
    this.yVel = -10;
    this.y += this.yVel;
  }

  this.inAir = function() {
    return this.y < 200;
  }

  this.toOriginalHeight = function() {
    this.y = 200;
  }

  this.gravity = function() {
    if(this.inAir()) {
      this.yVel += 4;
      this.y += this.yVel;
      this.yVel *= 0.6;
    }
  }

  this.anyCollisions = function(obstacle) {
    return obstacle.contactsRunner();
  }


  this.draw = function() {
    //console.log(runner);
    drawFrame(runnerImage,runner.cycle_loop[runner.currLoopIndex],
      runner.verticalFrame, runner.x,runner.y);
  }
}
