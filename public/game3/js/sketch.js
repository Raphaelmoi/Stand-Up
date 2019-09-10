let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let gameOver = true;
let time = 0;
let util, draws;

//body position
let noseX = 0, noseY = 0;
let lastNoseX = 0, lastNoseY = 0;
let life = 100;

//loading animation
let loadingAnimation;
//Images
let imgBackground;


let soundAlreadyPlay = false;

var x1 = 0;
var x2;
var scrollSpeed = 7;

let imgRunSprite;
let runImg = [];


let referenceOFRealPositionOfNoise = 0;

function preload() {
    imgBackground = loadImage('img/2d.jpg');
    imgRunSprite = loadImage('img/running.png');
}

function setup() {
    util = new Util();
    draws = new Draws();
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    x2 = -width;
    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    //adapt size of items, 'normal' screen width is 1400
    screenSizeAdaptator = windowWidth / 1400;
    if (screenSizeAdaptator < 0.5) {
        screenSizeAdaptator = 0.5;
    }
    frameRate(60);
    util.spriteImage(imgRunSprite, runImg, 240, 240, 10, 50);
    

}

function modelReady() {
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
    referenceOFRealPositionOfNoise = noseY;
}

function draw() {
    if (readyToStart) {
         //Since player is alive
        if (life > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            // image(video, 0, 0, width, height);//met la video dans le canvas          
            drawBackground();

            pop();
            draws.drawBird();

        } else {
            if (gameOver) { //prevent the song to be play more than one time
                gameoverSound.play();
                gameOver = false;
                //background(0);
                fill(244, 36, 36);
                textSize(40);
                textAlign(CENTER);
                text("GAME OVER", width / 2, height / 3);
                text("SCORE : " + (collectedGems * level + explosedStones ) , width / 2, height / 2);
                fill(244, 244, 244);
                textSize(25);
                text('Vous serez redirigé vers la page d\'accueil dans moins de 3 secondes ', width / 2, (height / 3 *2));
                function endGame () {
                    remove();
                    window.location.href = '/projet5/index.php?action=endgame&success=endgame&game=2&score='+ (collectedGems * level + explosedStones );
                }
                setTimeout(endGame, 3000);
            }
        }
    } //if still loading        
    else {
        loadingAnimation = select('.bubbles-wrapper');
        background(0);
        fill(245);
        textSize(40);
        textAlign(CENTER);
        text("GAME IS LOADING...", width / 2, height / 2);
    }
}
//give body position from the ml5 posenet.on
function gotPoses(poses) {
    if (poses.length > 0) {
        lastNoseX = noseX;
        lastNoseY = noseY;
        let newNoseX = poses[0].pose.keypoints[0].position.x;
        let newNoseY = poses[0].pose.keypoints[0].position.y;

        noseX = lerp(noseX, newNoseX, 0.9);
        noseY = lerp(noseY, newNoseY, 0.9);
    }
}

function drawBackground(){
    image(imgBackground, x1, 0, width, height);
    image(imgBackground, x2, 0, width, height);
        x1 += scrollSpeed;
    x2 += scrollSpeed;
    if (x1 >= width){
      x1 = -width;
    }
    if (x2 >= width){
      x2 = -width;
    }
}