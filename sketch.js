let video;
let poseNet;
//body position
let noseX = 0;
let noseY = 0;
let lastNoseX = 0;
let lastNoseY = 0;
let eyelX = 0;
let eyelY = 0;

let imgBackground;

let imgStone0, imgStone1, imgStone2, imgStone3, imgStone4, imgStone5, imgStone6, imgStone7;
let boxImgStones = [];
let stones = [];

let ruby0, ruby1, ruby2, saphir, diamond;
let gems = [];
let boxGems = [];

let pillImg;
let potionImg;
let pills = [];
let potions = [];

let life = 100;

let explosionSprite;
let explose = [];
let explosionX = 0;
let explosionY = 0;
let explosion = false;
let exploseindex = 0;

let imgBirdSprite;
let bird = [];

let score = 0; 
var counterImage = 0;
let index = 0;//will allowed to move fom one image to another in birdImages
let morestone = 0;
let level = 1;



function preload(){
    imgBackground = loadImage('sky3.png');
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
    gems.push(ruby0, ruby1, ruby2, saphir, diamond);
    imgBirdSprite = loadImage('bird.png');
    explosionSprite = loadImage('explosion.png');
    pillImg = loadImage('pill.png'); 
    potionImg = loadImage('potion.png'); 
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    frameRate(18);

    sprite(imgBirdSprite, bird, 110, 101, 5, 14);
    sprite(explosionSprite, explose, 192, 192, 5, 6);

    for (var i = 0; i < 15; i++) {
        var choice = boxImgStones[Math.floor(Math.random()*boxImgStones.length)];
        stones.push(new Rocks(random(0, width), choice));    
    }
    for (var i = 0; i < 10; i++) { 
        var item = gems[Math.floor(Math.random()*gems.length)];
        boxGems.push(new Gems(random(0, width), item));    
    }
    for (var i = 0; i < 2; i++) {   
        pills.push(new Pill(random(0, width)));  
    }
    potions.push(new Potion(random(0, width)));  
    //ml5 posenet initialisation
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}


function modelReady(){
    console.log('model ready');
}

function gotPoses(poses){
    if (poses.length > 0) {
        lastNoseX = noseX;
        lastNoseY = noseY;

        let newNoseX = poses[0].pose.keypoints[0].position.x;
        let newNoseY = poses[0].pose.keypoints[0].position.y;    
        let newEyeLX = poses[0].pose.keypoints[1].position.x;
        let newEyeLY = poses[0].pose.keypoints[1].position.y;    
        noseX = lerp(noseX, newNoseX, 0.9);
        noseY = lerp(noseY, newNoseY, 0.9);
        eyelX = lerp(eyelX, newEyeLX, 0.9);
        eyelY = lerp(eyelY, newEyeLY, 0.9);
    }
}

function draw() {

    if (score >= level*7) {
        level++;
        for (var i = 0; i < 7; i++) {
        let choice = boxImgStones[Math.floor(Math.random()*boxImgStones.length)];
        stones.push(new Rocks(random(0, width), choice)); 
        console.log('more stone, level : '+ level); 
        }
    }

    if( life > 0){
        push();
        translate(width, 0);
        scale(-1, 1);
        //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
        image(imgBackground, 0,0, width, height);
        //background(0);
        pop();
        drawStone();

        if (lastNoseX - noseX > -10 ) {//-10 give a direction when player dont move
            // ellipse(width - noseX, noseY, 100, 100);
            image(bird[index], width - noseX-50, noseY-50);
        }
        else if (lastNoseX - noseX < -10){
            push();
            translate(width, 0);
            scale(-1, 1);
            // ellipse(noseX, noseY, 100, 100);
            image(bird[index], noseX-50, noseY-50);
            pop();
        }

        if (explosion) {
            image(explose[exploseindex], explosionX -50, explosionY -50);  
            exploseindex += 1;
        }

        //health bar
        noStroke();
        fill(255);
        textSize(20);
        text("Santé", 20, 20);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(18, 28, 250, 22);
        noStroke();
        fill(81, 221, 37);
        rect(19, 28, map(life, 0, 100, 0, 248), 21);
        
        //Points
        push();
        textAlign(RIGHT);
        fill(255);
        text("Score : ", width-80, 24);
        textSize(24);
        text(score*level, width-50, 24);
        pop();
    }
    
    else{
        background(0);
        fill(244, 36, 36);
        textSize(40);
        textAlign(CENTER);
        text("GAME OVER", width / 2, height / 3);
        text("SCORE : " + score*level + (', pierres : ')+ score, width/2, height/2);
    }
        //create the animation of the bird
        index = (index + 1);
        if (index == 12) {
          index = 0;
        }
            
        if (exploseindex == 6) {
            exploseindex = 0;
            explosion = false;
        }
}

function drawStone(){

    for (var i = stones.length - 1; i >= 0; i--) {
        var choice = boxImgStones[Math.floor(Math.random() * boxImgStones.length)];
        let currentY = stones[i].position.y + stones[i].fall * stones[i].speed;
        stones[i].display();
            if (stones[i].isOver(width, noseX, noseY)) {
                life -= 20;
                explosionX = stones[i].position.x;
                explosionY = currentY;
                stones.splice(i, 1);
                explosion = true;
            }

            if(currentY > height){
                stones.splice(i, 1);
                stones.push(new Rocks(random(0, width), choice));    
            }   
        }

    for (var i = boxGems.length - 1; i >= 0; i--) {
        let currentY = boxGems[i].position.y + boxGems[i].fall*boxGems[i].speed;
        boxGems[i].display();
        var item = gems[Math.floor(Math.random()*gems.length)];

        if (boxGems[i].isOver(width, noseX, noseY)) {
            boxGems.splice(i, 1);
            score++;
            boxGems.push(new Gems(random(0, width), item));   
        } 
        if(currentY > height){
            boxGems.splice(i, 1);
            boxGems.push(new Gems(random(0, width), item));    
        } 
    }

    for (var i = pills.length - 1; i >= 0; i--) {
        let currentY = pills[i].position.y + pills[i].fall*pills[i].speed;
        pills[i].display();
        if (pills[i].isOver(width, noseX, noseY)) {
            if (life + pills[i].getSante() >= 100 ) {
                life = 100;
            } else{
                life += pills[i].getSante();
            }
            pills.splice(i, 1);
            pills.push(new Pill(random(0, width)));  
        } 
        if(currentY > height){
            pills.splice(i, 1);
            pills.push(new Pill(random(0, width)));    
        } 
    }
    for (var i = potions.length - 1; i >= 0; i--) {
        let currentY = potions[i].position.y + potions[i].fall*potions[i].speed;
        potions[i].display();
        if (potions[i].isOver(width, noseX, noseY)) {
            if (life + potions[i].getSante() >= 100 ) {
                life = 100;
            } else{
                life += potions[i].getSante();
            }
            potions.splice(i, 1); 
            potions.push(new Potion(random(0, width)));    

        } 
        if(currentY > height){
            potions.splice(i, 1);
            potions.push(new Potion(random(0, width)));    
        } 
    }

}


