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

let stones = [];
let imgStone;

let imgBirdSprite;
let birds = [];

let score = 0; 
let y = 0;//speed of falling object

var birdImages = [];//box contain each movement of the bird
var totalImages = 14;// number of images in the bird box
var counterImage = 0;

let index = 0;//will allowed to move fom one image to another in birdImages

function preload(){
    imgBackground = loadImage('montagnes.jpg');
    imgStone = loadImage('stone.png');
    imgBirdSprite = loadImage('bird.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    frameRate(18);

    sprite(imgBirdSprite, birds, 110, 101, 5);

    for (var i = 0; i < 30; i++) {
        stones.push(new Stone(random(0, width)));    
    }

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
    push();
    translate(width, 0);
    scale(-1, 1);
    //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
    image(imgBackground, 0,0, width, height);
    pop();
    //drawStone(y);
    y = y + 4;


    // Animate by increasing our Y value
        image(birds[index], 200, 200);
        
        if (lastNoseX - noseX > -10 ) {//-10 give a direction when player dont move
            ellipse(width - noseX, noseY, 100, 100);
            image(birds[index], width - noseX-50, noseY-50);
        }
        else if (lastNoseX - noseX < -10){
            push();
            translate(width, 0);
            scale(-1, 1);
            ellipse(noseX, noseY, 100, 100);
            image(birds[index], noseX-50, noseY-50);
            pop();
        }
        //create the animation of the bird
        index = (index + 1);
        if (index == 12) {
          index = 0;
        }
    
}

function drawStone(y){
    for (let v of stones) {
        v.display(y);
        //console.log(noseX);
        if (v.isOver(width, noseX, noseY, y)) {
            console.log("nose over predators");
            v.destroy();
            stones.splice(v, 1);
            score ++;
            console.log('score :' + score)
            // predators.push(new Predator(random(width), 0));
        }
    }

}

