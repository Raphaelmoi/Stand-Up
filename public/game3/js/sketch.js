let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let loadingAnimation;
let gameOver = true;
let util, draws, gamePlay;

//body position
let noseX = 0, noseY = 0;
let lastNoseX = 0, lastNoseY = 0;
let life = 100;

//Images
let imgBackground;
//img flyingstep
let stepImg, stepImgBegin, stepImgEnd;
//img floor step top and under
let cornerleftTopEarthImg, cornerRightTopEarthImg, centerTopEarthImg;
let borderLeftImg,blockEarthImg, borderRightImg
//unused for now
let blockAloneImg, underBlockAlone;
let flyingBlockStepImgLeftCorner, flyingBlockStepImgRightCorner, flyingBlockStepImgCenter;

let trunkImg;
let treeImg = [], bushesImg = [];
//mouving background
let posBck1 = 0, posBck2;
var scrollSpeed = 2;//speed of bkg mouve
var groundSpeed = 7;//spedd of the floor

let imgJumper1, imgJumper2;
//Players image and box
let imgRunSprite;
let runImg = [];
//iterate all along the game and play elements at given value
let baseUnit = 0;

let flyingStep = [], blocStep = [], dragonImgBox = [];
let dragonImgBoxRight = [];

let rotateCoinImg;
let coinBoxImg = [];

let characteres = [];
let groundHeight = 30;
let currentGroundHeight;

let score = 0;

let catchCoinSound, startSound, hitSound;
let soundAlreadyPlay = false;

function preload() {
    for (var i = 0; i < 11; i++) {
        dragonImgBox.push(loadImage('img/dragon/drag_wr_'+i+'.png'));
        // dragonImgBoxRight.push(loadImage('img/dragon/drag_wl_'+i+'.png'));
    }

    rotateCoinImg = loadImage('img/coin.png');
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

    catchCoinSound = loadSound('sound/coin.wav');
    startSound = loadSound('sound/start73.mp3');
    hitSound = loadSound('sound/fall.wav');

    }

function setup() {
    util = new Util();
    draws = new Draws();
    gamePlay = new GamePlay();

    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    posBck2 = -width;

    characteres.push(new NoseItem());

    util.spriteImage(imgRunSprite, runImg, 240, 240, 10, 50);
    util.spriteImage(rotateCoinImg, coinBoxImg, 84, 84, 6, 6);

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
        if (!soundAlreadyPlay) {
            startSound.play();
            soundAlreadyPlay = true;
        }
        baseUnit++;

         //while player is alive
        if (life > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            // image(video, 0, 0, width, height);//met la video dans le canvas          
            draws.drawBackground();
            pop();

            draws.drawHealthAndText();
            gamePlay.gamePlay();

            draws.eraseOutItem();
            draws.animateAndDestroyCharacteres();

            //if they is a result bigger than 5 mean jump action
            if (lastNoseY - noseY > 5) {
                characteres[0].jumpWithNose();
            }

        } else {
            if (gameOver) { //prevent the song to be play more than one time
                gameOver = false;
                background(0);
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
