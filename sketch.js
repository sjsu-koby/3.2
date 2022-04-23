//flappy bird-like
//mouse click or x to flap

var GRAVITY = 0.3;
var JUMP = -9;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var dog, ground;
var rock;
var gameOver;
var dogImg, rockImg, groundImg, bgImg, bgS;
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
  dogImg = loadImage('assets/jumping_dog1.png');
  rockImg = loadImage('assets/rock.png');
  groundImg = loadImage('assets/flappy_ground.png');
  bgImg = loadImage('assets/flappy_bg.png');
  bgS = loadImage('assets/bg_dog.JPG');

  dog = createSprite(width / 2, height / 2.5, 40, 40);
  dog.rotateToDirection = true;
  dog.velocity.x = 15;
  dog.setCollider('circle', 0, 0, 20);
  dog.addAnimation('move', 'assets/jumping_dog1.png', 'assets/jumping_dog2.png', 'assets/jumping_dog3.png');

  ground = createSprite(windowWidth, windowHeight + 100); //image 800x200
  ground.addImage(groundImg);

  rocks = new Group();
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
  if (dog.collide(ground)) {
    dog.velocity.y = 0;
  }
}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === ' ' || key === ' ') {
      gameState = 'lvl1';
      image(bgS, 0, 0);
    }
  }
}

function titleScreen() {
  background(bgS);
  textSize(200);
  textAlign(CENTER);
  text('Jumping Dog', width * .01, height * .25);
  textSize(50);
  text('(Press "SPACE" To Play)', width * .01, height * .38);
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

    if (dog.overlap(rocks))
      die();

    //spawn rocks
    if (frameCount % 90 == 0) {
      var rockH = (-80);
      var rock = createSprite(dog.position.x + width + random(width), GROUND_Y - rockH / 3 + 1 + 250, 80, rockH);
      rock.addImage(rockImg);
      rocks.add(rock);

    }

    //get rid of passed rocks
    for (var i = 0; i < rocks.length; i++)
      if (rocks[i].position.x < dog.position.x - width / 2)
        rocks[i].remove();
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
  image(bgImg, 0, GROUND_Y - 160);
  camera.on();

  drawSprite(ground);
  drawSprites(rocks);
  drawSprite(dog);

}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  rocks.removeSprites();
  gameOver = false;
  updateSprites(true);
  dog.position.x = width / 2;
  dog.position.y = height / 1.3;
  dog.velocity.y = 2;
  ground.position.x = windowWidth;
  ground.position.y = windowHeight - 110;
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameOver)
      newGame();
    dog.velocity.y = JUMP;
    //dog.changeAnimation("jump");
  }

}

function gameStart() {

}
