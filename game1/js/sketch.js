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
//the bird
let imgBirdSprite;
let bird = [];
//sound
let explosionSound, catchGemSound, gameoverSound, startSound;

let util, draws;
let soundAlreadyPlay = false;


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
    imgBirdSprite = loadImage('img/bird.png');
    explosionSprite = loadImage('img/explosion.png');
    pillImg = loadImage('img/pill.png');
    potionImg = loadImage('img/potion.png');

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

    screenSizeAdaptator = windowWidth / 1400;
    if (screenSizeAdaptator < 0.5) {
        screenSizeAdaptator = 0.5;
    }

    frameRate(18);
    util.spriteImage(imgBirdSprite, bird, 110, 101, 5, 14);
    util.spriteImage(explosionSprite, explose, 192, 192, 5, 6);
    //falling items minimum set
    util.newStone(12);
    util.newGem(10);
    util.newPill(2);
    util.newPotion(1);
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

            draws.drawBird();
            draws.drawStones();
            draws.drawGems();
            draws.drawPotionsOrPills(pills);
            draws.drawPotionsOrPills(potions);
            draws.drawExplosion();
            draws.drawHealthAndText();
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
                text("SCORE : " + score * level, width / 2, height / 2);
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