function Animation(cycle_loop, currLoopIndex, frameCount) {
  this.cycle_loop = cycle_loop;
  this.currLoopIndex = currLoopIndex;
  this.frameCount = frameCount;

  this.draw = function() {
    window.requestAnimationFrame(gameLoop);
  }
}
