var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bg = new Image();
var bird = new Image();
var pipe = new Image();
var pipeRevert = new Image();
var gameO = new Image();
var retry = new Image();
var scoreImg = new Image();
var bg2 = new Image();
var cloud = new Image();
var cloud2 = new Image();
var cloud3 = new Image();
var ground = new Image();
var ground2 = new Image();

var x = cvs.width/2; /*coordonnées X du plappy*/
var y = cvs.height/2; /*coordonnées y du plappy*/
var px = cvs.width+1; /*coordonnées X du pipe*/
var py = -50; /*coordonnées Y du pipe   -350 -50*/
const ecartPipe = 140;
var pyTemp = 0; /*coordonnées temporaire Y du pipe contenant la position random*/
var vitesseBird = 0;/*coefficient vitesse bird*/
var vitessePipe = 0;/*coefficient vitesse pipe*/
var upMove = 0;/*hauteur saut bird*/
var score = 0;
var scoreTemp = 0;
var soundLose = 0;/*indicateur si sound play*/
var scoreDraw = 0;/*Score a afficher à la fin de la game*/
var xbg = 0;/*coordonnées X du BG*/
var xbg2 = xbg+cvs.width;/*coordonnées X du BG2*/
var vitesseBG = 0;/*coefficient vitesse BG*/
var vitesseCloud = 0;/*coefficient vitesse cloud*/
var vitesseCloud2 = 0;
var vitesseCloud3 = 0;
var xbgcloud = 0;/*coordonnées X des clouds suplementaire*/
var xbgcloud2 = cvs.width/2;
var xbgcloud3 = cvs.width;
var xG = 0;/*coordonnées X ground*/
var xG2 = cvs.width;
var vitesseground = 0;

ground2.src = "img/ground.png";
ground.src = "img/ground.png";
cloud.src = "img/cloud.png";
cloud2.src = "img/cloud2.png";
cloud3.src = "img/cloud3.png";
bg2.src = "img/bg.png";
bg.src = "img/bg.png";
bird.src = "img/dog.png";
pipe.src = "img/tube.png";
pipeRevert.src = "img/tubeRevert.png";
gameO.src = "img/gameOver.png";
retry.src = "img/retry.png";
scoreImg.src = "img/score.png";

var win = new Audio();
var lose = new Audio();
var aie = new Audio();
var bgSound = new Audio();
var flap = new Audio();

win.src = "sounds/success-win-sound-effect";
lose.src = "sounds/lose-sound-effects";
aie.src = "sounds/punch-gaming-sound-effect-hd";
bgSound.src = "sounds/spongebob-music-background-music-hd";
flap.src = "sounds/flap";

var restartButton = document.getElementById("restartButton");

function moveUp(){
  y += upMove;
  flap.play();
}

/*Calcule hauteur pipe UP*/
function mathHpipe() {
  pyTemp = Math.floor(Math.random() * (-50 +350 + 1)) -350;
}

/*BG & Clouds*/
function dessineBG() {
  ctx.drawImage(bg,xbg,0,cvs.width, cvs.height);
  ctx.drawImage(bg2,xbg2-1,0,cvs.width+2, cvs.height);
  ctx.drawImage(cloud,xbgcloud,20,cvs.width,200);
  ctx.drawImage(cloud,xbgcloud2,100,cvs.width,200);
  ctx.drawImage(cloud,xbgcloud3,200,cvs.width,200);
  xbg -= vitesseBG;
  xbg2 -= vitesseBG ;
  xbgcloud -= vitesseCloud;
  xbgcloud2 -= vitesseCloud2;
  xbgcloud3 -= vitesseCloud3;
  /*Si bg dépasse gauche canva positioner droite canvas*/
  if (xbg+cvs.width <= 0){
    xbg = cvs.width;
  } else if (xbg2+cvs.width <= 0){
    xbg2 = cvs.width;
  }
  if (xbgcloud+cvs.width <= 0) {
    xbgcloud = cvs.width;
  }
  if (xbgcloud2+cvs.width <= 0) {
    xbgcloud2 = cvs.width;
  }
  if (xbgcloud3+cvs.width <= 0) {
    xbgcloud3 = cvs.width;
  }
}

function dessineBirds() {
  ctx.drawImage(bird,x,y,50,50);
}

function dessinePipe() {
  mathHpipe();
  if (px > cvs.width) {
    py = pyTemp;
  }
  ctx.drawImage(pipeRevert,px,py,100,500);

  ctx.drawImage(pipe,px,py+500+ecartPipe,100,500);
}

function incrementeScore(){
  if ((x>px)&&(x<px+100)) {
    scoreTemp += 1;
  } if (scoreTemp == 40) {
    score +=1;
    scoreTemp = 0;
    if (soundLose != 1){
      win.play();
    }
  }
}

function loseSound(){
  if (soundLose == 0) {
    lose.play();
    aie.play();
    soundLose = 1;
  }
}

function gameOver() {
  /*stop le vitesse de tout les objets*/
  vitesseBird = 0;
  vitessePipe = 0;
  upMove = 0;
  vitesseBG = 0;
  vitesseCloud = 0;
  vitesseCloud2 = 0;
  vitesseCloud3 = 0;
  vitesseground = 0;
  /*affiche fenetres lose*/
  ctx.drawImage(gameO,cvs.width/6,cvs.height/4);
  ctx.drawImage(retry,cvs.width/2.3,cvs.height/1.5,70,70);
  restartButton.style.display="block";
  restartButton.onclick=restart;
  loseSound();
}

function vitesseBirdetPipe() {
  y += vitesseBird;
  px -= vitessePipe;
}

function colision(){
  /*Si bird colision up || down*/
  if ((y>=cvs.height-50) || (y<=0+50)) {
    gameOver();
  }
  /*Si bird colision Pipe*/
  if (   ((x+45>=px)&&(x<=px+100))    &&   ( (y+45>py+500+ecartPipe) || (y<py+500))  ){
    gameOver();
  }
}

function drawScore(){
  if (upMove!=0) {
    scoreDraw = score;
  }
  ctx.drawImage(scoreImg,0,cvs.height-100,100,100);
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("score : ",12,cvs.height-60);
  ctx.fillText(scoreDraw,40,cvs.height-30);
}

function dessineGround(){
  ctx.drawImage(ground,xG,50,cvs.width,cvs.height);
  ctx.drawImage(ground2,xG2-1,50,cvs.width+2,cvs.height);
  xG -= vitesseground;
  xG2 -= vitesseground;
  if (xG+cvs.width <= 0){
    xG = cvs.width;
  }
  if (xG2+cvs.width <= 0){
    xG2 = cvs.width;
  }
}

function flappyBird() {
  startButton.onclick = start;
  if (px < -100) {
    px = cvs.width+1;
  }
  ctx.clearRect(0,0,cvs.width,cvs.height);
  dessineBG();
  dessineBirds();
  dessinePipe();
  dessineGround();
  vitesseBirdetPipe();
  ctx.drawImage(bird,x,y,50,50);
  colision();
  incrementeScore();
  bgSound.play();
  if (startButton.style.display == "none"){
    drawScore();
  }
}

function start(){
  restart();
  startButton.style.display = "none";
}

function restart() {
  x = cvs.width/2;
  y = cvs.height/2;
  px = cvs.width+1;
  py = -50;
  pyTemp = null;
  vitesseBird = 2.5;
  vitessePipe = 2.5;
  upMove = -60;
  restartButton.style.display="none";
  scoreTemp = 0;
  score = 0;
  soundLose = 0;
  soundColision = 0;
  vitesseBG = 0.5;
  vitesseCloud = 1.5;
  vitesseCloud2 = 2;
  vitesseCloud3 = 1;
  vitesseground = 1;
}

bgSound.volume = 0.2;
win.volume = 0.3;
lose.volume = 0.3;
aie.volume = 0.1;
document.addEventListener("click",moveUp);
setInterval(flappyBird,10);
