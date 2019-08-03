let video;
let poseNet;
let readyToStart = false;
let gameOver = true;
let screenSizeAdaptator;
let life = 100;
let score = 0;
let level = 1;
//body position
let noseX = 0,
    noseY = 0;
let lastNoseX = 0,
    lastNoseY = 0;

let leftHandX =0, leftHandY = 0;
let rightHandX = 0, rightHandY = 0;
let lastLeftHandX = 0, lastRightHandX = 0;



//loading animation
let loadingAnimation;
//Images
let imgBackground;
let imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7;
let boxImgStones = [];
let ruby0, ruby1, ruby2, saphir, diamond;
let boxImgGems = [];
let pillImg, potionImg;
//array of objects
let boxGems = [];
let stones = [];
let pills = [];
let potions = [];
//explosion of stone
let explosionSprite;
let explose = [];
//the spaceship
let spaceShip;
let spaceShipLeftHand;
let spaceShipRightHand;

let laserLeftImg;
let laserRightImg;

//sound
let explosionSound, catchGemSound, gameoverSound;

let util, draws, noseSpaceShip, leftHandSpaceShip, rightHandSpaceShip;
let laserX = 0, laserY = 0;
// let mouvement = 0;

let switchSide = false;
let test = 0;

function preload() {
    imgBackground = loadImage('img/sky.jpg');
    imgStone0 = loadImage('img/stone0.png');
    imgStone1 = loadImage('img/stone1.png');
    imgStone2 = loadImage('img/stone2.png');
    imgStone3 = loadImage('img/stone3.png');
    imgStone4 = loadImage('img/stone4.png');
    imgStone5 = loadImage('img/stone5.png');
    imgStone6 = loadImage('img/stone6.png');
    imgStone7 = loadImage('img/stone7.png');
    boxImgStones.push(imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7);
    ruby0 = loadImage('img/ruby0.png');
    ruby1 = loadImage('img/ruby1.png');
    ruby2 = loadImage('img/ruby2.png');
    saphir = loadImage('img/saphir.png');
    diamond = loadImage('img/diamond.png');
    boxImgGems.push(ruby0, ruby1, ruby2, saphir, diamond);
    spaceShip = loadImage('img/PNG/ufoGreen.png');
    spaceShipLeftHand = loadImage('img/PNG/playerShip2_blue.png');
    spaceShipRightHand = loadImage('img/PNG/playerShip2_orange.png');
    laserLeftImg = loadImage('img/PNG/Lasers/laserBlue16.png');
    laserRightImg = loadImage('img/PNG/Lasers/laserRed16.png');
    explosionSprite = loadImage('img/explosion.png');
    pillImg = loadImage('img/pill.png');
    potionImg = loadImage('img/potion.png');

    explosionSound = loadSound('sound/fall.wav');
    catchGemSound = loadSound('sound/coin.wav');
    gameoverSound = loadSound('sound/round_end.wav');
}

function setup() {
    util = new Util();
    draws = new Draws();

    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    screenSizeAdaptator = windowWidth / 1400;
    if (screenSizeAdaptator < 0.5) {
        screenSizeAdaptator = 0.5;
    }

    frameRate(24);
    //util.spriteImage(imgBirdSprite, bird, 110, 101, 5, 14);
    util.spriteImage(explosionSprite, explose, 192, 192, 5, 6);
    //falling items minimum set
    util.newStone(12);
    util.newGem(10);
    util.newPill(2);
    util.newPotion(1);

    noseY = height-100;
    // leftHandY = height-100;
    // rightHandY = height-100;
}

function modelReady() {
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
    noseSpaceShip = new NoseSpaceShip();
    leftHandSpaceShip = new LeftHandSpaceShip();
    rightHandSpaceShip = new RightHandSpaceShip();

}

function draw() {

    if (readyToStart) {
        //win a level every 7 gems catch
        if (score >= level * 7) {
            level++;
            util.newStone(5);
            util.newGem(2);
            util.newPill(1);
        } //Since player is alive
        if (life > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
            image(imgBackground, 0, 0, width, height);
            pop();

            draws.drawNoseShip();
            draws.drawLeftHandship();
            draws.drawRightHandship();
            //draws.drawLaser(rightHandX, rightHandY , laserRightImg, 3, -30);

            for (var i = 0; i < 8; i+=4) {
                draws.drawLaser(leftHandX, leftHandY, laserLeftImg, i, 30);
                draws.drawLaser(rightHandX, rightHandY, laserRightImg, i+1, 30);   
                draws.drawLaser(leftHandX, leftHandY, laserLeftImg, i+2, -30);
                draws.drawLaser(rightHandX, rightHandY , laserRightImg, i+3, -30);
            }    
            draws.drawStones();
            draws.drawGems();
            draws.drawPotionsOrPills(pills);
            draws.drawPotionsOrPills(potions);
            draws.drawHealthAndText();
     
            draws.drawExplosion();

        } else {
            if (gameOver) { //prevent the song to be play more than one time
                noLoop();
                gameoverSound.play();
                gameOver = false;
                background(0);
                fill(244, 36, 36);
                textSize(40);
                textAlign(CENTER);
                text("GAME OVER", width / 2, height / 3);
                text("SCORE : " + score * level + (', pierres : ') + score, width / 2, height / 2);
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
        // lastNoseY = noseY;
        lastLeftHandX = leftHandX;
        lastRightHandX = rightHandX;

        let newNoseX = poses[0].pose.keypoints[0].position.x;
        // let newNoseY = poses[0].pose.keypoints[0].position.y;
        // console.log(poses[0].pose.keypoints[9].score);
        let newleftHandX = poses[0].pose.keypoints[3].position.x;
        let newleftHandY = poses[0].pose.keypoints[3].position.y;
        let newrightHandX = poses[0].pose.keypoints[4].position.x;
        let newrightHandY = poses[0].pose.keypoints[4].position.y;
        noseX = lerp(noseX, newNoseX, 0.9);
        // noseY = lerp(noseY, newNoseY, 0.9);
        leftHandX = lerp(leftHandX, newleftHandX, 0.9);
        leftHandY = lerp(leftHandY, newleftHandY, 0.9);
        rightHandX = lerp(rightHandX, newrightHandX, 0.9);
        rightHandY = lerp(rightHandY, newrightHandY, 0.9);
    }
}

function timeOut(i){
    let side;
                if (switchSide) {
                    side= 30;
                    switchSide = !switchSide;
                }else{
                    side = -30;
                    switchSide = !switchSide;
                }                
                if (i%2 == 0) {
                    draws.drawLaser(leftHandX, leftHandY, laserLeftImg, i, side);
                }
                else{
                    draws.drawLaser(rightHandX, rightHandY, laserRightImg, i, side)
                }
}