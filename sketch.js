var trex, trex_running,trexmorreu, edges;
var groundImage, ground;
var quad;
var nuvem, nuvem_image;
var cacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var score=0
var grupodecactos,grupodenuvens;
var gamestate="jogando";
var gameover, gameover_Image, restart, restart_Image;
var jump, checkpoint, die;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexmorreu =loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png");
  nuvem_image = loadImage("cloud.png");
  cacto1=loadImage("obstacle1.png");
  cacto2=loadImage("obstacle2.png");
  cacto3=loadImage("obstacle3.png");
  cacto4=loadImage("obstacle4.png");
  cacto5=loadImage("obstacle5.png");
  cacto6=loadImage("obstacle6.png");
  gameover_Image=loadImage("gameOver.png");
  restart_Image=loadImage("restart.png");
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkpoint.mp3")
  die=loadSound("die.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  //criando o trex
  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trexmorreu", trexmorreu);
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  edges = createEdgeSprites();
  ground = createSprite(width/2, height-15);
  ground.addImage("ground2", groundImage);
  quad = createSprite(100, height-10, 200, 5);
  quad.visible = false

  grupodecactos=new Group()
  grupodenuvens=new Group()
  trex.debug=true
  trex.setCollider("circle", 0,0,30)
  //trex.setCollider("rectangle", 60,0,200,100,0)
  gameover=createSprite(width/2, height/2-60)
  restart=createSprite(width/2, height/2)
  gameover.addImage("gameoverImage", gameover_Image);
  restart.addImage("restartImage", restart_Image);
  restart.scale=0.5
  gameover.visible=false
  restart.visible=false
}
function draw() {
  //definir a cor do plano de fundo 
  background("white");
if(score>0 && score%100==0){
  checkpoint.play()
}

if(gamestate==="jogando"){
//score=score+Math.round(frameCount/300);
score=score+Math.round(getFrameRate()/60)
 //pular quando tecla de espaço for pressionada
  if (keyDown("space") && trex.y > height-35) {
    trex.velocityY = -10;
    jump.play()
  }
  trex.velocityY = trex.velocityY + 0.5;
   ground.velocityX = -(5+3*score/100)
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  nuvens()
  cactos()
  if (trex.isTouching(grupodecactos)) {
gamestate="end"
//trex.velocityY = -10;
die.play()
 }
}
else if(gamestate==="end"){
trex.velocityY=0
ground.velocityX=0
grupodecactos.setVelocityXEach(0)
grupodenuvens.setVelocityXEach(0)
trex.changeAnimation("trexmorreu", trexmorreu)
gameover.visible=true
restart.visible=true
grupodecactos.setLifetimeEach(-1)
grupodenuvens.setLifetimeEach(-1)
if (mousePressedOver(restart)){
reiniciar()
}
}
text ("score "+score,30,30)

  //impedir que o trex caia
  trex.collide(quad)
  drawSprites();
}
function reiniciar(){
  gamestate="jogando"
  grupodecactos.destroyEach()
  grupodenuvens.destroyEach()
  gameover.visible=false
  restart.visible=false
  score=0
  trex.changeAnimation("running", trex_running);
}
function nuvens() {
  if(frameCount%100===0){
  nuvem=createSprite(width+20, 150);
  grupodenuvens.add(nuvem)
  nuvem.addImage(nuvem_image);
  nuvem.velocityX=-3;
  nuvem.depth=trex.depth;
  trex.depth=trex.depth+1;
  nuvem.scale=random(0.3,1);
  nuvem.y=Math.round(random(15,height-60));
  nuvem.lifetime=700;
  }}
function cactos(){
  if(frameCount%100===0){
  cacto=createSprite(width+20,height-40);
  cacto.velocityX=-(5+3*score/100);
  cacto.scale=0.7
  cacto.lifetime=300;
  grupodecactos.add(cacto)
  var aleatorio= Math.round(random(1,6));
  switch (aleatorio) {
    case 1:cacto.addImage(cacto1)
      break;
    case 2:cacto.addImage(cacto2)
      break;
    case 3:cacto.addImage(cacto3)
      break;
    case 4:cacto.addImage(cacto4)
      break;
    case 5:cacto.addImage(cacto5)
      break;
    case 6:cacto.addImage(cacto6)
      break;
    default:
      break;
  } 
}}