#Flappy bird   
Fappy bird en native JS sans FrameWork  

##Index.php  
Simple fichier php :  
 Un ```canvas``` contenant le jeu.  
```
<canvas id="canvas" width="500" height="700"></canvas>

```

 Deux ```button``` "button" & "button2", qui respectivement gére le "ReStart" et "Start" du jeu.  
```
<button type="button" id="restartButton" name="button"></button>
<button type="button" id="startButton" name="button2"></button>

```
##main.js  
I/Variables & Objets     
Création des variables :
```
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
...

var bg = new Image();
var bird = new Image();
...

var win = new Audio();
var lose = new Audio();
...
```   

Création et affectation des variables Objet pour les sons et images:  
```
ground2.src = "img/ground.png";
ground.src = "img/ground.png";
...

win.src = "sounds/success-win-sound-effect";
lose.src = "sounds/lose-sound-effects";
...
```
