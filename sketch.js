let video;
let poseNet;
let readyToStart = false;
let gameOver = true;
//body position
let noseX = 0, noseY = 0;
let lastNoseX = 0, lastNoseY = 0;
//loading animation
let loadingAnimation;
let loadedBkg;
//Images
let imgBackground;

let imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7;
let boxImgStones = [];
let stones = [];
let ruby0, ruby1, ruby2, saphir, diamond;
let boxImgGems = [];
let boxGems = [];
let pillImg, potionImg;
let pills = [];
let potions = [];
//explosion of stone
let explosionSprite;
let explose = [];
let explosionX = 0, explosionY = 0;
let explosion = false;
let exploseindex = 0;

let imgBirdSprite;
let bird = [];
//sound
let explosionSound, catchGemSound, gameoverSound;

let index = 0;//will allowed to move fom one image to another in birdImages
let life = 100;
let score = 0; 
let level = 1;

function preload(){
    imgBackground = loadImage('sky.jpg');
    imgStone0 = loadImage('stone0.png');
    imgStone1 = loadImage('stone1.png');
    imgStone2 = loadImage('stone2.png');
    imgStone3 = loadImage('stone3.png');
    imgStone4 = loadImage('stone4.png');
    imgStone5 = loadImage('stone5.png');
    imgStone6 = loadImage('stone6.png');
    imgStone7 = loadImage('stone7.png');
    boxImgStones.push(imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7);
    ruby0 = loadImage('ruby0.png');
    ruby1 = loadImage('ruby1.png');
    ruby2 = loadImage('ruby2.png');
    saphir = loadImage('saphir.png');
    diamond = loadImage('diamond.png');
    boxImgGems.push(ruby0, ruby1, ruby2, saphir, diamond);
    imgBirdSprite = loadImage('bird.png');
    explosionSprite = loadImage('explosion.png');
    pillImg = loadImage('pill.png'); 
    potionImg = loadImage('potion.png'); 

    explosionSound = loadSound('sound/fall.wav');
    catchGemSound = loadSound('sound/coin.wav');
    gameoverSound = loadSound('sound/round_end.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    
    frameRate(18);
    sprite(imgBirdSprite, bird, 110, 101, 5, 14);
    sprite(explosionSprite, explose, 192, 192, 5, 6);
    //falling items minimum set
    newStone(15);
    newGem(10);
    for (let i = 0; i < 2; i++) {   
        pills.push(new Pill(random(0, width)));  
    }
    potions.push(new Potion(random(0, width))); 
}

function modelReady(){
    console.log('model ready');
    readyToStart = true;
    loadingAnimation.addClass('display-none');
}

function gotPoses(poses){
    if (poses.length > 0) {
        lastNoseX = noseX;
        lastNoseY = noseY;
        let newNoseX = poses[0].pose.keypoints[0].position.x;
        let newNoseY = poses[0].pose.keypoints[0].position.y;       
        noseX = lerp(noseX, newNoseX, 0.9);
        noseY = lerp(noseY, newNoseY, 0.9);
    }
}

function draw() {
    if (readyToStart) {
        //win a level every 7 gems catch
        if (score >= level*7) {
            level++;
            newStone(7);
        }//Since player is alive
        if( life > 0){
            push();
            translate(width, 0);
            scale(-1, 1);
            //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
            image(imgBackground, 0,0, width, height);
            pop();

            drawStones();
            drawGems();
            drawPotionsOrPills(pills);
            drawPotionsOrPills(potions);
            drawBird();
            drawExplosion();
            drawHealthAndText();        
        }
        else{
            if (gameOver) {//prevent the song to be play more than one time
                noLoop();
                gameoverSound.play();
                gameOver = false;
                background(0);
                fill(244, 36, 36);
                textSize(40);
                textAlign(CENTER);
                text("GAME OVER", width / 2, height / 3);
                text("SCORE : " + score*level + (', pierres : ')+ score, width/2, height/2);
            }
        }
    }//if still loading        
    else{
        loadingAnimation = select('.bubbles-wrapper');
        background(0);
        fill(245);
        textSize(40);
        textAlign(CENTER);
        text("GAME IS LOADING...", width/2 , height / 2);
    }
}

function newStone(qtt){
    for (let i = 0; i < qtt; i++) {
        let choice = boxImgStones[Math.floor(Math.random()*boxImgStones.length)];
        stones.push(new Rocks(random(0, width), choice));    
    }
}
function newGem(qtt)
{
    for (let i = 0; i < qtt; i++) { 
        let item = boxImgGems[Math.floor(Math.random()*boxImgGems.length)];
        boxGems.push(new Gems(random(0, width), item));    
    }
}