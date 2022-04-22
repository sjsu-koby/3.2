//flappy bird-like
//mouse click or x to flap

var GRAVITY = 0.3;
var JUMP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var dog, ground;
var pipes;
var gameOver;
var dogImg, pipeImg, groundImg, bgImg, bgS;
var gameState = 'title';
var clouds = [];
var changeDirection = 0;
var y;
var s;

function setup() {
  createCanvas(windowWidth, windowHeight);
  changeDirection = false;
  s = 0;
  y = 1;
  for (let i = 0; i <= 5; i++) {
    clouds[i] = new Cloud(
      random(1, 10) * width * 0.4,
      random(1, 10) * -height * 0.03,
      random(4) * 0.8
    );
  }
  dogImg = loadImage('assets/flappy_dog.png');
  pipeImg = loadImage('assets/flappy_pipe.png');
  groundImg = loadImage('assets/flappy_ground.png');
  bgImg = loadImage('assets/flappy_bg.png');
  bgS = loadImage('assets/bg_dog.jpg');

  dog = createSprite(width / 2, height / 2.5, 40, 40);
  dog.rotateToDirection = true;
  dog.velocity.x = 4;
  dog.setCollider('circle', 0, 0, 20);
  dog.addImage(dogImg);

  ground = createSprite(windowWidth, windowHeight - 100); //image 800x200
  ground.addImage(groundImg);

  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height / 2;
}

function draw() {
  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'lvl1':
      gameStage1();
      break;
    case 'gameOver':
      gameOver();
      break;
  }
}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === ' ' || key === ' ') {
      gameState = 'lvl1';
      image(bgS);
    }
  }
}

function titleScreen() {
  background(bgS);
  textSize(200);
  textAlign(CENTER);
  text('Jumping Dog', width * .01, height * .25);
  textSize(50);
  text('Press "SPACE" To Play', width * .01, height * .78);
}

function gameStage1() {

  if (gameOver && keyWentDown('x'))
    newGame();

  if (!gameOver) {

    if (keyWentDown('x'))
      dog.velocity.y = JUMP;

    dog.velocity.y += GRAVITY;

    if (dog.position.y < 0)
      dog.position.y = 0;

    if (dog.overlap(ground))
      die();

    if (dog.overlap(pipes))
      die();

    //spawn pipes
    if (frameCount % 60 == 0) {
      var pipeH = random(50, -60);
      var pipe = createSprite(dog.position.x + width, GROUND_Y - pipeH / 3 + 1 + 200, 80, pipeH);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if (pipeH < 200) {
        pipeH = height - (height - GROUND_Y) - (pipeH + MIN_OPENING);
        pipe = createSprite(dog.position.x + width, pipeH / 2 - 50, 200, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for (var i = 0; i < pipes.length; i++)
      if (pipes[i].position.x < dog.position.x - width / 2)
        pipes[i].remove();
  }

  camera.position.x = dog.position.x + width / 4;
  ground.position.x = dog.position.x + width / 4;
  //wrap ground
  // if(camera.position.x > ground.position.x)
  // ground.position.x+=ground.width;

  background(0, 204, 255);
  camera.off();
  for (i = 0; i < clouds.length; i++) {
    clouds[i].display();
    clouds[i].move();
  }
  image(bgImg, 0, GROUND_Y - 170);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(dog);

}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  dog.position.x = width / 2;
  dog.position.y = height / 2;
  dog.velocity.y = 0;
  ground.position.x = windowWidth;
  ground.position.y = windowHeight - 100;
}

function keyPressed() {
  if (gameOver)
    newGame();
  dog.velocity.y = JUMP;
}

function gameStart() {

}
