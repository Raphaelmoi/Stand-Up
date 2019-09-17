let video;
let poseNet;
let screenSizeAdaptator;
let readyToStart = false;
let gameOver = true;
let collectedGems = 0;
let explosedStones = 0;
let level = 1;
let asstroLife = 1;
let leftShipLife = 50, rightShipLife = 50;
let ammoL = 1200, ammoR = 1200;
//body position
let noseX = 0, noseY = 0;
let leftEarX =0, leftEarY = 0;
let rightEarX = 0, rightEarY = 0;
let laserX = 0, laserY = 0;//laser position
//determine if a new spaceShip item have to fall
let fallingSpaceShipL = false, fallingSpaceShipR = false;
//loading animation
let loadingAnimation;
//Images
let imgBackground;
let imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7;
let boxImgStones = [];
let ruby0, ruby1, ruby2, saphir, diamond;
let boxImgGems = [];
let pillImg, potionImg;
let ammoImg;
//array of objects
let boxGems = [], stones = [], pills = [], potions = [], ammos = [];
//explosion of stone
let explosionSprite;
let explose = [];

let astroImg;
let spaceShipLeftEar, spaceShipRightEar;//SpaceShips left and right Img
let laserLeftImg, laserRightImg;//laser img
let fallingShipL, fallingShipR; //img of falling ufo
let newSpaceShipL, newSpaceShipR;//the future object of falling ship

let explosionSound, catchGemSound, gameoverSound, startSound;
let soundAlreadyPlay = false;
let util, draws;

let time = 0;
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
    astroImg  = loadImage('img/astro.png');
    spaceShipLeftEar = loadImage('img/PNG/playerShip2_blue.png');
    spaceShipRightEar = loadImage('img/PNG/playerShip2_orange.png');
    laserLeftImg = loadImage('img/PNG/Lasers/laserBlue16.png');
    laserRightImg = loadImage('img/PNG/Lasers/laserRed16.png');
    explosionSprite = loadImage('img/explosion.png');
    fallingShipL = loadImage('img/PNG/ufoBlue.png');
    fallingShipR = loadImage('img/PNG/ufoRed.png');
    explosionSound = loadSound('sound/fall.wav');
    catchGemSound = loadSound('sound/coin.wav');
    gameoverSound = loadSound('sound/round_end.wav');
    startSound = loadSound('sound/start73.mp3');
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
    //adapt size of items, 'normal' screen width is 1400
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
    noseY = height-(110 * screenSizeAdaptator);
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
        //win a level every 7 gems catch
        if (collectedGems >= level * 7) {
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
            image(imgBackground, 0, 0, width, height);
            time++;
            if (time < 60) 
            {
                noTint();
                tint(255,255,255, (200 - time*7));
                image(video,  0, 0, width, height);//met la video dans le canvas
            }
            pop();
            draws.drawsEverything();
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
        let newNoseX = poses[0].pose.keypoints[0].position.x;
        let newleftEarX = poses[0].pose.keypoints[3].position.x;
        let newleftEarY = poses[0].pose.keypoints[3].position.y;
        let newrightEarX = poses[0].pose.keypoints[4].position.x;
        let newrightEarY = poses[0].pose.keypoints[4].position.y;
        noseX = lerp(noseX, newNoseX, 0.9);
        leftEarX = lerp(leftEarX, newleftEarX, 0.8);
        leftEarY = lerp(leftEarY, newleftEarY, 0.8);
        rightEarX = lerp(rightEarX, newrightEarX, 0.8);
        rightEarY = lerp(rightEarY, newrightEarY, 0.8);
    }
}