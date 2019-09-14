let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let loadingAnimation;
let gameOver = true;
let util, draws;

//body position
let noseX = 0, noseY = 0;
let lastNoseX = 0, lastNoseY = 0;
let life = 100;


//Images
let imgBackground;

let stepImg;
let stepImgBegin;
let stepImgEnd;

let blockEarthImg;
let cornerleftTopEarthImg;
let cornerRightTopEarthImg;
let centerTopEarthImg;

var posBck1 = 0;
var posBck2;
var scrollSpeed = 2;
var groundSpeed = 7;
let imgRunSprite;
let runImg = [];

let baseUnit = 0;

let flyingStep = [];
let blocStep = []

let imgJumper1;
let imgJumper2;

let characteres = [];

let currentGroundHeight;

function preload() {
    imgBackground = loadImage('img/forest/bg_forest.png');
    imgRunSprite = loadImage('img/running.png');
    stepImg = loadImage('img/forest/forest_pack_13.png');
    stepImgBegin = loadImage('img/forest/forest_pack_38.png');
    stepImgEnd = loadImage('img/forest/forest_pack_15.png');

    blockEarthImg = loadImage('img/forest/forest_pack_35.png');
    cornerleftTopEarthImg = loadImage('img/forest/forest_pack_03.png');
    cornerRightTopEarthImg = loadImage('img/forest/forest_pack_07.png');
    centerTopEarthImg = loadImage('img/forest/forest_pack_05.png');

    imgJumper1 = loadImage('img/jump_up.png');
    imgJumper2 = loadImage('img/jump_fall.png');
}

function setup() {
    util = new Util();
    draws = new Draws();
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    posBck2 = -width;

    characteres.push(new NoseItem());

    util.spriteImage(imgRunSprite, runImg, 240, 240, 10, 50);

    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    //adapt size of items, 'normal' screen width is 1400
    screenSizeAdaptator = windowWidth / 1400;
    if (screenSizeAdaptator < 0.5) {
        screenSizeAdaptator = 0.5;
    }
    frameRate(70);
}

function modelReady() {
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
}

function draw() {
    if (readyToStart) {
        baseUnit++;
         //while player is alive
        if (life > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            // image(video, 0, 0, width, height);//met la video dans le canvas          
            drawBackground();
            pop();

            draws.gamePlay();

            for (var i = 0; i < flyingStep.length; i++) {
                flyingStep[i].move();
                flyingStep[i].show();
                if ( flyingStep[i].x+flyingStep[i].xSize < 0) {
                    flyingStep.splice(i, 1);
                }
            }
            for (var i = 0; i < blocStep.length; i++) {
                blocStep[i].move();
                blocStep[i].show();
                if (blocStep[i].x + blocStep[i].xSize < 0) {
                    blocStep.splice(i, 1);
                }
            }
            
            let decors = [flyingStep, blocStep];
            for (let c of characteres){
                //check the existence of the jump() method before calling it
                if (typeof c.jump === "function") { 
                    c.jump();
                }
                c.move();
                c.show();

                for (var j = 0; j < decors.length; j++) {

                    for (var i = decors[j].length - 1; i >= 0; i--) {
                        if (c.hitsStep(decors[j][i])){
                            if (c.hitsStepFromUnder(decors[j][i])) {
                                c.vy = 10;
                            }
                            else{
                                c.y = decors[j][i].y - (c.r*0.5);
                                c.isJumping = false;
                            }
                        }
                        //if the position of the bloc is behind the players
                        // if (decors[j][i].x + decors[j][i].xSize <= c.x) {
                        //     c.isJumping = true;
                        // }
                    }
                }
            }
            //delete chips when they are out of screen
            for (var i = 0; i >= characteres.length -1; i--) {
                if (characteres[i].x < 0) {
                    characteres[i].splice(i, 1);
                }
            }

            if (lastNoseY - noseY > 15) {
                characteres[0].jumpWithNose();
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
        if (baseUnit%2 == 0){
            lastNoseY = noseY;
        }
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