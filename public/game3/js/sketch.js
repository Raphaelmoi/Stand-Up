let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let gameOver = true;
// let time = 0;
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

let stepImg;
let stepImgBegin;
let stepImgEnd;

let blockEarthImg;
let cornerleftTopEarthImg;
let cornerRightTopEarthImg;
let centerTopEarthImg;

var posBck1 = 0;
var posBck2;
var scrollSpeed = 7;

let imgRunSprite;
let runImg = [];

let baseUnit = 0;
let noseItem;

let ennemies = [];
let flyingStep = [];
let blocStep = []

let jumperEnnemie = []; 
let imgJumper1;
let imgJumper2;
// let chose = true;


function preload() {
    imgBackground = loadImage('img/2d.jpg');
    imgRunSprite = loadImage('img/running.png');
    stoneImg = loadImage('img/assto2.png');
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

    noseItem = new NoseItem();
    jumperEnnemie = new JumperEnnemie();
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
            // if (baseUnit%50 == 0) {
            //     let randomStep = round(random(1,4))
            //     let randomObject =  round(random(1, 3));
            //     console.log(randomStep);
            //     switch (randomObject){
            //         case 1:
            //             flyingStep.push(new FlyingStep(randomStep, 4, 1));
            //             break;
            //         case 2:
            //             ennemies.push(new Ennemie());
            //         break;
            //         case 3 :
            //             blocStep.push(new BlockStep(0, 5, 3));
            //         break;
            //     }
            // }
            noseItem.move();
            noseItem.show();

            // jumperEnnemie.jump();
            // jumperEnnemie.move();
            // jumperEnnemie.show();
            for (let e of ennemies){
                e.jump()
                e.move();
                e.show();
                if (noseItem.hits(e)) {
                    console.log('gameOver');
                }
            }

            for (var i = flyingStep.length - 1; i >= 0; i--) {
                if (noseItem.hitsStep(flyingStep[i]))
                {
                    if (noseItem.hitsStepFromUnder(flyingStep[i]))
                    {
                        noseItem.vy = 10;
                    }
                    else{
                        noseItem.y = flyingStep[i].y - (noseItem.r*0.5);
                        noseItem.isJumping = false;
                    }
                }
                //if the position of the bloc is behind the players
                if (flyingStep[i].x + flyingStep[i].xSize <= noseItem.x) {
                    noseItem.isJumping = true;
                }
                flyingStep[i].move();
                flyingStep[i].show();
                //if the block is out of the screen
                if ( flyingStep[i].x+flyingStep[i].xSize < 0) {
                    flyingStep.splice(i, 1);
                }
            }

            for (var i = blocStep.length - 1; i >= 0; i--) {
                if (noseItem.hitsStep(blocStep[i]))
                {
                    if (noseItem.hitsStepFromUnder(blocStep[i]))
                    {
                        noseItem.vy = 10;
                    }else{
                        noseItem.y = blocStep[i].y - (noseItem.r*0.5);
                        noseItem.isJumping = false;
                    }
                }
                //if the position of the bloc is behind the players
                if (blocStep[i].x + blocStep[i].xSize <= noseItem.x) {
                    noseItem.isJumping = true;
                }
                blocStep[i].move();
                blocStep[i].show();
                //if the block is out of the screen
                if (blocStep[i].x + blocStep[i].xSize < 0) {
                    blocStep.splice(i, 1);
                }
            }

            if (lastNoseY - noseY > 15) {
                noseItem.jump();
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