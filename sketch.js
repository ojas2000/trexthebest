var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;
var reStart;
var gam;
var re;
var check;
var die;
var jump;


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jump = loadSound("jump.mp3");
  check = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  
  
  gam =loadImage("gameOver.png");
  re =loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  
  trex.setCollider("circle",0,0,40);
 trex.debug = true;
  
  
  gameOver=createSprite(300,100)
  reStart=createSprite(300,140)
  
  gameOver.addImage(gam)
  reStart.addImage(re)
  reStart.scale= .5
  
  gameOver.scale=.5
  
  
  score = 0;
}

function draw() 
{
  
 
  
  
  background("white");
  text("Score: "+ score, 500,50);

  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(4+score/100);
    obstaclesGroup.velocityXEach= -(4+score/100)
   
     
    
    
    gameOver.visible=false
    reStart.visible=false
    
    
            if ( frameCount% 3 === 0)
              {
                score = score + 1;
              }

            if (frameCount % 60 === 0)
          {
                spawnObstacles();
                spawnClouds();

          }

            if (ground.x < 0){
            ground.x = ground.width/2;
             }
 
            if(keyDown("space")&& trex.y >= 161)
            { 
            trex.velocityY = -13;
              jump.play();
              }
    
    if(score%100 === 0 && score > 0)
      {
        check.play();
      }
    
      trex.velocityY = trex.velocityY + 0.8
    
     if(obstaclesGroup.isTouching(trex))
       {
         gameState = END
         
         
       }

  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    
    
    gameOver.visible=true
    reStart.visible=true
    
    cloudsGroup.setLifetimeEach(-1)
     obstaclesGroup.setLifetimeEach(-1)
    
    trex.velocityY=0;
    
    trex.changeAnimation("collided",trex_collided);
    
    if(mousePressedOver(reStart))
      {
        reset();
}
    
    
    
    
  }
  
  
 
  

  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}


function reset()
{
  gameState=PLAY;
      gameOver.visible=false
    reStart.visible=false
  obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running)
  
}












function spawnObstacles(){
 
   var obstacle = createSprite(650,170,10,40);
   obstacle.velocityX = -(4+score/100);
 
  

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
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
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
  trex.depth = obstacle.depth+1;
  reStart.depth = obstacle.depth+1;
 
}




function spawnClouds() {
  //write code here to spawn the clouds
 
     cloud = createSprite(650,100,40,10);
    cloud.y = Math.round(random(10,70));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  
  
}