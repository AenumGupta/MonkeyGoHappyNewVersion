var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,backImage,back;
var foodGroup, obstacleGroup;
var survivalTime=0,score=0;
var ground;
var gameState="play";

function preload(){
  backImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  back=createSprite(displayWidth/2,600);
  back.addImage(backImage);
  back.velocityX=-2;
  back.scale=1.05;

  ground=createSprite(displayWidth/2,displayHeight-110,displayWidth,10);
  ground.velocityX=-2;
  
  monkey=createSprite(displayWidth-900,displayHeight-110,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  obstacleGroup=new Group;
  foodGroup=new Group;
  
}
function draw(){
  
  
   
  
 
if(ground.x <displayWidth/2.22){
    ground.x = ground.width/2;
  } 
  
  ground.visible=true;
  
  if(back.x<displayWidth/2.22){
    back.x=back.width/2;
  }

 if(gameState==="play"){
   
  if(keyDown("space")){
    monkey.velocityY=-5;
  }
  
  monkey.velocityY=monkey.velocityY+0.6;
  monkey.collide(ground);
  
 
  
spawnObstacles();
  spawnFood();
   
   if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score=score+2;
     
     switch(score){
       case 10: monkey.scale=0.22;
         break;
         
        case 20: monkey.scale=0.24;
         break;
         
        case 30: monkey.scale=0.26;
         break;
         
        case 40: monkey.scale=0.28;
         break;
         
        default:    
         break;
         
     }
   }
   
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale=0.1;
 }
   
   if(obstacleGroup.isTouching(monkey)){
     gameState="end";
   }

   camera.position.x = displayWidth/2;
   camera.position.y = monkey.y;

drawSprites();
 }
  if(gameState==="end"){
    background("aqua");
    textSize(30);
    fill("pink");
    text("Game Over",displayWidth-600,displayHeight/2);
    
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
    
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0); 
    
  }
  
  //text(mouseX+"x"+mouseY+"y",mouseX,mouseY);
  stroke("purple");
  textSize(20);
  fill("purple");
  text("Score :"+score,150,50);
  
  
}

function spawnObstacles(){
  
  if(frameCount%300===0){
    obstacle=createSprite(displayWidth/2,displayHeight-126);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-2;
    obstacle.scale=0.1;
    obstacle.lifetime=800;
    obstacleGroup.add(obstacle);
    
  }
  
}

function spawnFood(){
  
  if(frameCount%200===0){
    banana=createSprite(displayWidth/2,Math.round(random(300,400)));
    banana.addImage(bananaImage);
    banana.velocityX=-2;
    banana.scale=0.1;
    banana.lifetime=800;
    foodGroup.add(banana);
  }
  
}



