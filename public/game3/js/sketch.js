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
let borderLeftImg;
let borderRightImg
let blockAloneImg;
let underBlockAlone;

let flyingBlockStepImgLeftCorner;
let flyingBlockStepImgRightCorner;
let flyingBlockStepImgCenter;

let trunkImg;
let treeImg = [];
let bushesImg = [];


var posBck1 = 0;
var posBck2;
var scrollSpeed = 2;
var groundSpeed = 7;
let imgRunSprite;
let runImg = [];

let baseUnit = 0;

let flyingStep = [];
let blocStep = [];
let drawnDragon = [];
let dragonImgBox = [];
let dragonImgBoxRight = [];

let rotateCoinBoxImg = [];

let imgJumper1;
let imgJumper2;

let characteres = [];

let currentGroundHeight;

function preload() {
    for (var i = 0; i < 11; i++) {
        dragonImgBox.push(loadImage('img/dragon/drag_wr_'+i+'.png'));
        dragonImgBoxRight.push(loadImage('img/dragon/drag_wl_'+i+'.png'));
    }
    for (var i = 1; i <= 6; i++) {
        rotateCoinBoxImg.push(loadImage('img/coin/star'+i+'.png'));
    }
    imgBackground = loadImage('img/forest/bg_forest.png');
    imgRunSprite = loadImage('img/running.png');

    stepImg = loadImage('img/PNG/Tile_11.png');
    stepImgBegin = loadImage('img/PNG/Tile_10.png');
    stepImgEnd = loadImage('img/PNG/Tile_12.png');

    blockEarthImg = loadImage('img/PNG/Tile_5.png');
    cornerleftTopEarthImg = loadImage('img/PNG/Tile_1.png');
    cornerRightTopEarthImg = loadImage('img/PNG/Tile_3.png');
    centerTopEarthImg = loadImage('img/PNG/Tile_2.png');

    borderLeftImg = loadImage('img/PNG/Tile_4.png');
    borderRightImg = loadImage('img/PNG/Tile_6.png');


    imgJumper1 = loadImage('img/jump_up.png');
    imgJumper2 = loadImage('img/jump_fall.png');

    blockAloneImg = loadImage('img/PNG/Tile_13.png');
    underBlockAlone = loadImage('img/PNG/Tile_15.png');
    flyingBlockStepImgLeftCorner = loadImage('img/PNG/Tile_7.png');
    flyingBlockStepImgRightCorner = loadImage('img/PNG/Tile_9.png');
    flyingBlockStepImgCenter = loadImage('img/PNG/Tile_8.png');
    trunkImg = loadImage('img/PNG/Object_4.png');
    treeImg.push(loadImage('img/PNG/Object_16.png'));
    treeImg.push(loadImage('img/PNG/Object_17.png'));
    bushesImg.push(loadImage('img/PNG/Object_12.png'));
    bushesImg.push(loadImage('img/PNG/Object_13.png'));
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

            for (let c of characteres){
                //check the existence of the jump() method before calling it
                if (typeof c.jump === "function") { 
                    c.jump();
                }
                c.move();
                c.show();
            }
            //clean all the charactere who all ready appear
            let k = characteres.length;
            while (k--) {
                if (characteres[k].x < 0) {
                    characteres.splice(k, 1);
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