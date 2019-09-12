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
let stoneImg; 

var posBck1 = 0;
var posBck2;
var scrollSpeed = 7;

let imgRunSprite;
let runImg = [];

let baseUnit = 0;
let noseItem;

let ennemies = [];
let blocStep = [];

let c;


function preload() {
    imgBackground = loadImage('img/2d.jpg');
    imgRunSprite = loadImage('img/running.png');
    stoneImg = loadImage('img/assto2.png');
}

function setup() {
    util = new Util();
    draws = new Draws();
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    posBck2 = -width;

    noseItem = new NoseItem();

    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    //adapt size of items, 'normal' screen width is 1400
    screenSizeAdaptator = windowWidth / 1400;
    if (screenSizeAdaptator < 0.5) {
        screenSizeAdaptator = 0.5;
    }
    frameRate(70);
    util.spriteImage(imgRunSprite, runImg, 240, 240, 10, 50);
}

function modelReady() {
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
}

function keyPressed(){
    if (key == ' ') {
        noseItem.jump();
    }
}

function draw() {
    if (readyToStart) {
        baseUnit++;
        // console.log(baseUnit);
         //Since player is alive
        if (life > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            // image(video, 0, 0, width, height);//met la video dans le canvas          
            drawBackground();
            pop();
            // draws.drawNosePerson();

            if (random(1) < 0.009) {
                // ennemies.push(new Ennemie());
                blocStep.push(new Decors(2, 500));
            }
            noseItem.move();
            noseItem.show();

            // for (let e of ennemies){
            //     e.move();
            //     e.show();
            //     if (noseItem.hits(e)) {
            //         console.log('gameOver');
            //     }
            // }
            let see = blocStep.length;
            for (let b of blocStep){
                b.move();
                b.show();
                if (noseItem.hitsStepFromUpper(b)) {
                    noseItem.y = b.getHeight();
                    noseItem.isJumping = false;
                }

            }

        } else {
            if (gameOver) { //prevent the song to be play more than one time
                gameOver = false;
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
    image(imgBackground, posBck1, 0, width, height);
    image(imgBackground, posBck2, 0, width, height);
    posBck1 += scrollSpeed;
    posBck2 += scrollSpeed;
    if (posBck1 >= width){
      posBck1 = -width;
    }
    if (posBck2 >= width){
      posBck2 = -width;
    }
}