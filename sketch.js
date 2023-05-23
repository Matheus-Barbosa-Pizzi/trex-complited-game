var PLAY=1;
var END=0
var gameState=PLAY

var trex, trex_running;

var ground, groundImg;

var invisibleGround;

var cloud;

var cloudImg;

var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var obstaclesGroup, cloudsGroup;

var gameOver, gameOverImg, restart, restartImg

var trexCollided;

var jumpSound, checkPointSound, dieSound;

function preload(){

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImg=loadImage("ground2.png")

  cloudImg=loadImage("cloud.png")

  obstacle1=loadImage("obstacle1.png");

  obstacle2=loadImage("obstacle2.png");

  obstacle3=loadImage("obstacle3.png");

  obstacle4=loadImage("obstacle4.png");

  obstacle5=loadImage("obstacle5.png");

  obstacle6=loadImage("obstacle6.png");

  gameOverImg=loadImage("gameOver.png");

  restartImg=loadImage("restart.png");

  trexCollided=loadImage("trex_collided.png")

  jumpSound=loadSound("jump.mp3");

  checkPointSound=loadSound("checkpoint.mp3");

  dieSound=loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth-20, windowHeight)
  
trex=createSprite(50, height-70, 20,50);
 trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexCollided);
   trex.scale=0.7

ground=createSprite(width/2,height-50,width,2);
  ground.addImage(groundImg);

invisibleGround=createSprite(width/2,height+24,width,125)
 invisibleGround.visible=false

gameOver=createSprite(width/2,height/2-50);
 gameOver.addImage(gameOverImg)

restart=createSprite(width/2,height/2)
 restart.addImage(restartImg)

obstaclesGroup=new Group();

cloudsGroup=new Group();

score=0

trex.debug=false;
}

function draw(){

background("white");

if(gameState===PLAY){
textSize(30); 
 fill("green") 
  text("pontuação:"+score, 20, 130);
   score=score+Math.round(getFrameRate()/60);

  spawnClouds();

  spawnObstacles();

if(score>0&&score%750===0){

 checkPointSound.play();
}

if(touches.length>0 || keyDown("space")&& trex.y>257){
 trex.velocityY=-10;

 jumpSound.play();

 touches=[];
}
trex.velocityY=trex.velocityY+0.5;

ground.velocityX=-(2+3*score/1000);

if(ground.x<0){
  ground.x=ground.width/2;
}
 

if(obstaclesGroup.isTouching(trex)){

 gameState=END;

 dieSound.play();
}

gameOver.visible=false;

restart.visible=false;
}
else if(gameState===END){

ground.velocityX=0;

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

obstaclesGroup.setVelocityXEach(0);

cloudsGroup.setVelocityXEach(0);

gameOver.visible=true;

restart.visible=true;

trex.changeAnimation("collided",trexCollided)
trex.velocityY=0

if(mousePressedOver(restart)){ 
  reset(); 
}
}

 trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds(){

if(frameCount %40===0){
 cloud=createSprite(windowWidth, 100, 40,10)
  cloud.velocityX=-3;
   cloud.addImage(cloudImg);
    cloud.scale=1.3;
     cloud.y=Math.round(random(100, 220));

cloud.depth=trex.depth;
 trex.depth=trex.depth+1;

cloud.lifetime=530;

cloudsGroup.add(cloud);
}
}

function spawnObstacles(){

if(frameCount %70===0){
 obstacle=createSprite(windowWidth, windowHeight-75, 10,40),
  obstacle.velocityX=-(6+score/1000);
   var rand=Math.round(random(1,6));
    switch(rand){

     case 1: obstacle.addImage(obstacle1);
     break;
     
     case 2: obstacle.addImage(obstacle2);
     break;

     case 3: obstacle.addImage(obstacle3);
     break;

     case 4: obstacle.addImage(obstacle4);
     break;

     case 5: obstacle.addImage(obstacle5);
     break;

     case 6: obstacle.addImage(obstacle6);
     break;

     default:break
    }
     obstacle.lifetime=260;
      obstacle.scale=0.8;

obstaclesGroup.add(obstacle)
}
}

function reset(){

gameState = PLAY; obstaclesGroup.destroyEach(); 

cloudsGroup.destroyEach(); score = 0;

trex.changeAnimation("running",trex_running);

gameOver.visible = false;

restart.visible = false; 
}
