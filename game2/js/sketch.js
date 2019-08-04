let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let gameOver = true;
let asstroLife = 1;
let leftShipLife = 50;
let rightShipLife = 50;
let ammoL = 1200;
let ammoR = 1200;
let score = 0;
let level = 1;
//body position
let noseX = 0, noseY = 0;
let leftEarX =0, leftEarY = 0;
let rightEarX = 0, rightEarY = 0;
let lastLeftEarX = 0, lastRightEarX = 0, lastNoseX = 0;

let laserX = 0, laserY = 0;//laser position
//determine if a new spaceShip item have to fall
let fallingSpaceShipL = false, fallingSpaceShipR = false;
//loading animation
let loadingAnimation, deadAstroGif;
//Images
let imgBackground;
let imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7;
let boxImgStones = [];
let ruby0, ruby1, ruby2, saphir, diamond;
let boxImgGems = [];
let pillImg, potionImg;
let ammoImg;
//array of objects
let boxGems = [];
let stones = [];
let pills = [];
let potions = [];
let ammos = [];
//explosion of stone
let explosionSprite;
let explose = [];

let astroImg;
let spaceShipLeftEar, spaceShipRightEar;//SpaceShips left and right Img
let laserLeftImg, laserRightImg;//laser img
let fallingShipL, fallingShipR; //img of falling ufo
let newSpaceShipL, newSpaceShipR;

let gameOverBck;
//sound
let explosionSound, catchGemSound, gameoverSound;

let util, draws;

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
    pillImg = loadImage('img/pill.png');
    potionImg = loadImage('img/potion.png');
    ammoImg = loadImage('img/ammo.png');
    astroImg  = loadImage('img/assto2.png');
    spaceShipLeftEar = loadImage('img/PNG/playerShip2_blue.png');
    spaceShipRightEar = loadImage('img/PNG/playerShip2_orange.png');
    laserLeftImg = loadImage('img/PNG/Lasers/laserBlue16.png');
    laserRightImg = loadImage('img/PNG/Lasers/laserRed16.png');
    explosionSprite = loadImage('img/explosion.png');
    fallingShipL = loadImage('img/PNG/ufoBlue.png');
    fallingShipR = loadImage('img/PNG/ufoRed.png');
    // gameOverBck = loadImage('img/asstronaute.gif');

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
    util.spriteImage(explosionSprite, explose, 192, 192, 5, 6);
    //falling items minimum set
    util.newStone(12);
    util.newGem(10);
    util.newPill(1);
    util.newPotion(1);
    util.newAmmo(3);
    //fixed position for the astronaute(noseY)
    noseY = height-110;
}

function modelReady() {
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
    deadAstroGif = select('.deadAstro');

}

function draw() {
    if (readyToStart) {
        //win a level every 7 gems catch
        if (score >= level * 7) {
            level++;
            util.newStone(5);
            util.newGem(1);
            util.newPill(1);
            util.newAmmo(1);
        } //Since player is alive
        if (asstroLife > 0) {
            push();
            translate(width, 0);
            scale(-1, 1);
            //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
            image(imgBackground, 0, 0, width, height);
            pop();

            draws.drawNoseShip();
            draws.drawLeftEarship();
            draws.drawRightEarship();
            draws.drawStones();
            draws.drawGems();
            draws.drawPotionsOrPills(pills);
            draws.drawPotionsOrPills(potions);
            draws.drawHealthAndText();
            draws.drawAmmo();
            draws.drawExplosion();
            if(fallingSpaceShipL){
                draws.drawNewSpaceShip(0);
            }
            if (fallingSpaceShipR) {
                draws.drawNewSpaceShip(1);
            }
        } else {

            // gameOverBck = createImg("img/asstronaute.gif", 200, 200);
            // gameOverBck.position( 250,  210);

            if (gameOver) { //prevent the song to be play more than one time
                gameoverSound.play();
                gameOver = false;
                background(0);
                deadAstroGif.removeClass('display-none');
                deadAstroGif.addClass('deadAstro');
                // gameOverBck.position( (width / 2 - 250), (height / 2 - 210));
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
        lastLeftEarX = leftEarX;
        lastRightEarX = rightEarX;

        let newNoseX = poses[0].pose.keypoints[0].position.x;
        // let newNoseY = poses[0].pose.keypoints[0].position.y;
        // console.log(poses[0].pose.keypoints[9].score);
        let newleftEarX = poses[0].pose.keypoints[3].position.x;
        let newleftEarY = poses[0].pose.keypoints[3].position.y;
        let newrightEarX = poses[0].pose.keypoints[4].position.x;
        let newrightEarY = poses[0].pose.keypoints[4].position.y;
        noseX = lerp(noseX, newNoseX, 0.9);
        // noseY = lerp(noseY, newNoseY, 0.9);
        leftEarX = lerp(leftEarX, newleftEarX, 0.9);
        leftEarY = lerp(leftEarY, newleftEarY, 0.9);
        rightEarX = lerp(rightEarX, newrightEarX, 0.9);
        rightEarY = lerp(rightEarY, newrightEarY, 0.9);
    }
}