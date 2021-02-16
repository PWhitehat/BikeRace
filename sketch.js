var path,mainCyclist, cyclgrp;
var pathImg,mainRacerImg1,mainRacerImg2;
var obs1,obs2,obs3, obsgrp;
var gameOver, gameOverImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var obstacle;
var distance=0;
var bellSound;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  gameOverImg = loadImage("gameOver.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  bellSound = loadSound("sound/bell.mp3");
}

function createObstacle() {
  
  obstacle = createSprite(600, Math.round(random(370, 30)));
  
  var obschoose = Math.round(random(1,3));
  
  obstacle.velocityX = -5;
  
  obstacle.depth = mainCyclist.depth - 1;
  
  obsgrp.add(obstacle);
  
  obstacle.lifetime = 250;
  
    switch(obschoose) {
    
      case 1: obstacle.addImage(obs1); obstacle.scale = 0.1;
      break;
      
      case 2: obstacle.addImage(obs2); obstacle.scale = 0.1;
      break;
      
      case 3: obstacle.addImage(obs3); obstacle.scale = 0.1;
      break;
    
      default:
      break;
      
  }
  
}

function setup(){
  
  createCanvas(500,300);
  
  cyclgrp = new Group();
  obsgrp = new Group();
  
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  cyclgrp.add(mainCyclist);  
  
  gameOver = createSprite(250, 150);
  gameOver.addImage(gameOverImg);
  
}

function draw() {
  
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    
    mainCyclist.y = World.mouseY;
  
    edges= createEdgeSprites();
    mainCyclist.collide(edges);
    
    if (frameCount % 80 === 0) {
      
      createObstacle();
      
    }
    
    distance = distance + Math.round(getFrameRate() / 60);
    
    if (cyclgrp.isTouching(obsgrp)) {
      
      obsgrp.destroyEach();
      gameState = END;
      
    }
    
    if (keyDown("space")) {
      
      bellSound.play();
      
    }
    
    path.velocityX = -5;
  
    //code to reset the background
    if(path.x < 0 ) {
    
      path.x = width/2;
    
    }
    
  }
  
  if (gameState === END) {
    
    gameOver.visible = true;
    path.velocityX = 0;
    
    if (keyDown("r")) {
      
      gameState = PLAY;
      
    }
    
  }
  
}