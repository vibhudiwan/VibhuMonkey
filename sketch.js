
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var fruitGroup, obstacleGroup;
var score=0,b,bi,ib,number,monkeystill,score1=0,life=10,appI,apple;
var appleGroup,gi,grape,grapeGroup,score2=0,burp;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bi=loadImage("b.png");
  monkeystill=loadAnimation("sprite_1.png","sprite_0.png");
  appI=loadImage("Apple.png");
  gi=loadImage("grape.png");
  burp=loadSound("h.mp3");
 
}



function setup() {
  createCanvas(600,600);
  fruitGroup=createGroup();
  obstaclesGroup=createGroup();
  appleGroup=createGroup();
  grapeGroup=createGroup();
  
  monkey=createSprite(80,450);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  b=createSprite(400,650,700,10);
  b.addImage("br",bi);
  b.scale=2;
  
  ib=createSprite(300,10,700,10);
  
  
  
}


function draw() {
  background("lightblue");
  textSize(22);
  text("PRESS ALT TO JUMP BIG",300,30);
  text("IF ENERGY=40,LIFE++",300,50);
  text("WHEN YOU JUMP ENERGY-1.",300,75);
   
  monkey.rotation=0;
  
    score=Math.round(Math.ceil(frameCount/frameRate()));
    monkey.velocityY = monkey.velocityY + 0.8   
  if(score1<=0){
    score1=0;
  }
  if(score2<=0){
    score2=0;
  }
   if(keyDown("space") && monkey.y >= 480) {
      monkey.velocityY = -16;
      score1=score1-1;
     }
  if(keyDown("alt")&& monkey.y >= 480){
    monkey.velocityY=-23;
    score1=score1-1;
  }
   
  b.velocityX=-16;  
     if(b.x<90){
    b.x=b.width/2;
  }
  number=Math.round(random(1,5));
  if(number===1){
  spawnbanans();
  }
  if(number===2){
  spawnobstacles(); 
  }
  if(number===3){
    apples();
  }
  if (number===4){
    grapes();
  }
  if(number===5){
  spawnobstacles(); 
  }
  
    if (monkey.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score1=score1+9;
    score2=score2+9;
    //burp.play( );  
    }
  if (monkey.isTouching(grapeGroup)){
    grapeGroup.destroyEach();
    score1=score1+15;
    //burp.play( );  
    score2=score2+15;
    
    }
    if (monkey.isTouching(appleGroup)){
    appleGroup.destroyEach();
    score1=score1+11;
   // burp.play( );  
    score2=score2+11;  
    }
    if (score1>=40){
      score1=score1-40;
      life=life+1;
    }
    if(monkey.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach();
      life=life-1;
      score2=score2-35;
    }
  
  if(life===0){
    reset();
  }
  if(score>0&&score%40===0){
  obstaclesGroup.velocityX=obstaclesGroup.velocityX-40;
  fruitGroup.velocityX=fruitGroup.velocityX-40;
  grapeGroup.velocityX=grapeGroup.velocityX-40;
  appleGroup.velocityX=appleGroup.velocityX-40; 
  }
  monkey.collide(b);
  monkey.collide(ib);
 
  
  
  
  ib.visible=false;
  monkey.depth=monkey.depth+1;
  textSize(25);
  text("Survival Time : "+score,350,100);
  text("ENERGY : "+score1,10,50);
  text("LIFE         :"+life,10,80);
  text("SCORE    : "+score2,10,110);
  drawSprites();
}

function spawnbanans(){
  if(frameCount%60===0){
  r=Math.round(random(90,300));
  banana=createSprite(600,r);
  fruitGroup.add(banana);
  banana.addImage("bb",bananaImage);
  banana.scale=0.13;
  banana.velocityX=-10;
  fruitGroup.setLifetimeEach(100);
  }
}


function spawnobstacles(){
  if (frameCount%50===0){
  obstacle=createSprite(500,500);
  obstaclesGroup.add(obstacle);
  obstacle.addImage("oo",obstaceImage);
  obstacle.scale=0.3;
  obstacle.velocityX=-10;
  obstaclesGroup.setLifetimeEach(100);
  // obstacle.debug=true;
  obstacle.setCollider("rectangle",0,0,40,30);
  }
}

function apples(){
  if (frameCount%100===0){
    r=Math.round(random(90,300));
    apple=createSprite(600,r);
    appleGroup.add(apple);
    apple.addImage(appI);
    apple.scale=0.06;
    apple.velocityX=-10;
    appleGroup.setLifetimeEach(100);
  }
}

function grapes(){
  if (frameCount%80===0){
    r=Math.round(random(90,200));
    grape=createSprite(600,r);
    grapeGroup.add(grape);
    grape.addImage(gi);
    grape.scale=0.02;
    grape.velocityX=-10;
    grapeGroup.setLifetimeEach(100);
  }
}

function reset(){
  if(keyDown('space')){
    life=10;
  }
  text("SPACE TO REPLAY",200,300);
  monkey.rotation=240;
  b.velocityX=0;
  obstaclesGroup.destroyEach();
  fruitGroup.destroyEach();
  grapeGroup.destroyEach();
  appleGroup.destroyEach();
  score=0;
  score1=0; 
}







