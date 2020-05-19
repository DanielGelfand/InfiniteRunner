const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const SCALE = 0.7;
const WIDTH = 84;
const HEIGHT = 130;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const FRAME_LIMIT = 8;


/* Game variables */
let jumping;
let shooting;
let frameCount;
let pipeFrameCount;
let score;
let bullets;
let pipes;
let zombies;
let runner;
let gameEnded;
let runnerImage = new Image();
runnerImage.src = "sprites.png";
let blood = new Image();
blood.src = "blood.png";
let highScore = 0;
/*******************/

/************ GAME OBJECTS *************/
function setup() {

  // Reset
  score = 0;
  pipeFrameCount = 0;
  frameCount = 0;
  bullets = [];
  pipes = [];
  zombies = [];
  gameEnded = false;
  runner = new Runner([0,1,2,3,4,5]);

  gameLoop();

}

/********** SPAWN FUNCTIONS ***********/

function spawnBullets() {
  let bullet = new Bullet();
  bullets.push(bullet);
}

function spawnPipes() {
  let pipe = new Pipe();
  pipes.push(pipe);
}

function spawnZombies() {
  let zombie = new Zombie();
  zombies.push(zombie);
}

/************************************/

setup();

function gameLoop() {

  // Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw animations, spawning of obstacles, and maintain framecount
  drawScore(30);
  drawGround();
  runner.draw();
  drawZombies();
  handleFrameCount()
  jumpLogic();
  shootLogic();
  updatePipesAndScore();



  reqID = window.requestAnimationFrame(gameLoop);

  // Check for collision
  if(collision()) {
    endGame();
  }

}

// Draws specific part of animation sequence
// where frameX is the index of the frame horizontally
// where frameY is the index of the frame vertically
// and canvasX and canvasY are positions on the canvas
function drawFrame(image,frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(image,frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
  }

function updatePipesAndScore() {
  for(let i = 0; i < pipes.length; i+=1) {
    pipes[i].draw();
    pipes[i].move();

    if(pipes[i].x <= -30) {
      pipes.splice(i,1);
      score += 1;
      if(score > highScore){
        highScore += 1;
      }
    }
      //console.log(pipes);
  }
}

// Draws the score on the canvas
function drawScore(fontSize) {
  ctx.font = fontSize + "px Arial";
  ctx.fillText("Score: " + score, 10, 40);
  ctx.fillText("High Score: " + highScore, 10, 80);
}



// Handles animating character and spawing pipes based on frames
function handleFrameCount() {
  frameCount += 1;
  pipeFrameCount += 1;

  if(frameCount >= FRAME_LIMIT) {
    frameCount = 0;
    runner.currLoopIndex += 1;
  }

  if (runner.currLoopIndex >= runner.cycle_loop.length) {
        runner.currLoopIndex = 0;
  }


  if(pipeFrameCount % 50 == 0) {
    spawnPipes();
  }

  if(pipeFrameCount % 100 == 0) {
    spawnZombies();
  }

}

function endGame() {
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", 320, 150);
  if(runner.killer == "pipe"){
    ctx.drawImage(blood,pipes[0].x,pipes[0].y - 20,50,50);
  }
  else {
    ctx.drawImage(blood,zombies[0].x,zombies[0].y,50,50);
  }
  gameEnded = true;
}

function collision() {
  for(let i = 0; i < pipes.length; i+=1){
    if(pipes[i].contactsRunner()) {
      window.cancelAnimationFrame(reqID);
      runner.killer = "pipe";
      return true;
    }
  }

  for(let i = 0; i < zombies.length; i+=1){
    if(zombies[i].contactsRunner()) {
      window.cancelAnimationFrame(reqID);
      runner.killer = "zombie";
      return true;
    }
  }
  return false;
}

function jumpLogic() {
  if(jumping) {
    runner.jump();
    runner.cycle_loop = [0,1];
    runner.verticalFrame = 1;
  }

  if(runner.y <= 80){
    jumping = false;
    runner.yVel = 0;
  }

  else if(!jumping && !runner.inAir()) {
    runner.cycle_loop = [0,1,2,3,4,5];
    runner.verticalFrame = 0;
    runner.toOriginalHeight();
  }

  runner.gravity();

}

function shootLogic() {
  if (shooting && bullets.length == 0) {
    spawnBullets();
    shooting = false;
    bullets[bullets.length-1].xVel = 5;
  }
  // Keep it 1 bullet on the map at a time
  if(shooting && bullets.length > 0) {
    shooting = false;
  }

  if(bullets.length > 0 ) {
    for(let i = 0; i<bullets.length; i+=1) {
      bullets[i].draw();
      bullets[i].move();
      killZombies(bullets[i]);

    }
    removeBullets();
  }

}

// Remove bullets that are out of bounds or hit a target
function removeBullets() {
  for(let i = 0; i < bullets.length;i+=1) {
    if(bullets[i].x >= 800 || bullets[i].hitZombie) {
      bullets.splice(i,1);
    }
  }
}

function drawGround() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,270,canvas.width,100);
}


function drawZombies() {
  for(let i = 0; i < zombies.length; i+=1) {
    zombies[i].draw();
    zombies[i].move();
  }

}

function killZombies(bullet) {
  //alert("here");
  for(let i = 0; i < zombies.length;i+=1) {
    if(bullet.contactsZombie(zombies[i])) {
        console.log(bullet.x);
        console.log(zombies[i].x);
        zombies.splice(i,1);
        bullet.hitZombie = true;
    }
  }
}

function restart() {
  if(gameEnded) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("done");
    setup();
  }

}

window.addEventListener("keypress", function(event) {
  // If space has been pressed and runner is not in the air, then runner can jump
  //alert(event.keyCode);
  if(event.keyCode == 119 && !runner.inAir()) {
    jumping = true;
  }

  if(event.keyCode == 100) {
    shooting = true;
  }
});
