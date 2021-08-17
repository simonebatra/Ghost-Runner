var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  ghost.velocityY=2;
}

function draw() {
  background(200);

  if (gameState =="play"){
  
  if(tower.y > 400){
      tower.y = 300;
    }

  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x+-3;
  }

  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }

  ghost.velocityY=ghost.velocityY+0.5

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    gameState="end";
    ghost.destroy();
  }

  drawSprites();

  spawnDoorAndClimber();
}

  if(gameState == "end"){
    background("yellow");
    stroke("purple");
    fill("purple");
    textSize(30);
    text("Game Over!", + 250, 230);
  }

}

function spawnDoorAndClimber(){
  if (frameCount % 300 == 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x=Math.round(random(100, 400));
    door.velocityY=2;
    door.lifetime=800;

    climber = createSprite(200, -50);
    climber.addImage(climberImg);
    climber.x=door.x+10;
    climber.y=door.y+70;
    climber.velocityY=2;
    climber.lifetime=800;

    invisibleBlock = createSprite(200,-50);
    invisibleBlock.x=climber.x;
    invisibleBlock.y=climber.y;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=climber.height;
    invisibleBlock.velocityY=2;
    invisibleBlock.lifetime=800;
    invisibleBlock.debug=true;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  //ghost.depth=door.depth;
  //ghost.depth+=1;
}