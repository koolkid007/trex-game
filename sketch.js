var trex, trexImg, ground, groundImg, inxGround, cloudImg, cloudsGroup, obs1, obs2, obs3, obs4, obs5, obs6, obsGroup, collided, restart, gameOver, restartImg, gameOverImg 
var count = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  collided = loadAnimation("trex_collided.png");
  restartImg = loadAnimation("restart.png");
  gameOverImg = loadAnimation("gameOver.png");
} 

function setup() {
  createCanvas(800, 300);
  trex = createSprite(100,270,10,10);
  trex.addAnimation("running",trexImg);
  trex.addAnimation("collided", collided);
  trex.scale = 0.5;
  
  ground = createSprite(400,280,800,10);
  ground.x = ground.width/2;
  ground.addImage(groundImg);
  
  inxGround = createSprite(400,280,800,1);
  inxGround.visible = false;
  
  restart = createSprite(380,200,10,10);
  restart.addAnimation("restart",restartImg);
  restart.scale = 0.8;
  restart.visible = false;
  
  gameOver = createSprite(380,150,10,10);
  gameOver.addAnimation("end", gameOverImg);
  gameOver.visible = false;
  
  cloudsGroup = createGroup();
  obsGroup = createGroup();
}

function draw() {
  background("white");
  
  if(gameState === PLAY) {
    if(keyDown("space") && trex.y >=256) {
      trex.velocityY = -12;
  } 
   
  trex.velocityY = trex.velocityY + 0.7;
  
    if(ground.x<0) {
      ground.x = ground.width/2;
  } 
  
  count = count + round(getFrameRate()/50);
  ground.velocityX = -4;
  spawnClouds();
  spawnObs();

    if(obsGroup.isTouching(trex)) {
      gameState = END;
      trex.changeAnimation("collided", collided);
  } 
}  
    else if(gameState === END) {
    restart.visible = true;
    gameOver.visible = true;  
      
    ground.velocityX = 0;
    trex.velocityY = 0;
    obsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1); 
      
    if(mousePressedOver(restart)) {
      gameState = PLAY;
      obsGroup.destroyEach();
      cloudsGroup.destroyEach();
      restart.visible = false;
      gameOver.visible = false;        
      trex.changeAnimation("running",trexImg);
      count = 0;
    } 
  }        
  
  textSize(20);
  text("Score:" + count, 680,30 );
  
  trex.collide(inxGround);
  console.log(gameState);
  drawSprites();
}

function spawnClouds() {
  if(frameCount%60 === 0) {
    var cloud = createSprite(800,round(random(50,160)),10,10);
    cloud.velocityX = -5;
    cloud.addImage(cloudImg);
    cloud.scale = 0.75;
    cloud.lifetime = 165;
    
    cloud.depth = trex.depth;
    trex.depth++;
    
    cloudsGroup.add(cloud);
  }
} 

function spawnObs() {
  if(frameCount%160 === 0) {
    var obstacle = createSprite(800,260,10,10);
    obstacle.velocityX = -5;
    obstacle.scale = 0.6;
    obstacle.lifetime = 170;
    
    obsGroup.add(obstacle);
    
    var rand = round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break; 
      case 2: obstacle.addImage(obs2);
              break;  
      case 3: obstacle.addImage(obs3);
              break;  
      case 4: obstacle.addImage(obs4);
              break; 
      case 5: obstacle.addImage(obs5);
              break;  
      case 6: obstacle.addImage(obs6);
              break;    
      
      default: break;        
    }    
    
  } 
} 