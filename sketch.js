let video;
let poseNet;
let noseX = 0;
let noseY = 0;

let lastNoseX = 0;
let lastNoseY = 0;

let eyelX = 0;
let eyelY = 0;

let imgBackground;
let imgStone;
let y = 0;

let positionStone = [];

var images = [];
var totalImages = 12;
var counterImage = 0;
var loadingImage = false;

var loading = true;

let index = 0;

let extraCanvas;

function preload(){
    imgBackground = loadImage('montagnes.jpg');
    imgStone = loadImage('stone.png');
    imgTest = loadImage('nez.png');
}

function loadImageElement(filename) {
  loadImage(filename, imageLoaded);

  function imageLoaded(image) {
    console.log(filename);
    images.push(image);

    counterImage++;
    if (counterImage == totalImages) {
      loadingImage = true;
    }
  }
}

function setup() {
    frameRate(18);

  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(displayWidth, displayHeight);
  video.hide();

  for (var i = 0; i <= totalImages; i++) {
    // positionStone.push(new Stone(random(width), 0))
    positionStone.push(random(0 , width));

    loadImageElement("bird" + i + ".png");
  }


  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function modelReady(){
  console.log('model ready');
}

function gotPoses(poses){
  // console.log('poses');
  if (poses.length > 0) {
    lastNoseX = noseX;
    lastNoseY = noseY;

    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;    
    let newEyeLX = poses[0].pose.keypoints[1].position.x;
    let newEyeLY = poses[0].pose.keypoints[1].position.y;    
    noseX = lerp(noseX, newX, 0.7);
    noseY = lerp(noseY, newY, 0.7);
    eyelX = lerp(eyelX, newEyeLX, 0.5);
    eyelY = lerp(eyelY, newEyeLY, 0.5);

    // console.log("lastNoseX : " + lastNoseX + ", noseX : "+ noseX);
  }
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  //image(video, 0, 0, displayWidth, displayHeight);//met la video dans le canvas
  image(imgBackground, 0,0, width, height);
  pop();
  //image(imgBackground,  0, 0);
  let d = dist(noseX, noseY, eyelX, eyelY);
  // extraCanvas.image(imgEye,random(width),random(height), d*1.4 , d*1.4);  
  // image( imgNose, (noseX - d), (noseY - d), d*1.4 , d*1.4);
  // Animate by increasing our x value
  y = y + 4;


  if (loadingImage) {
    loading = false;
  }

  if (!loading) {
    // fill(255);
    // noStroke();
    if (lastNoseX > noseX ) {
      image(images[index], width - noseX - d, noseY - d ) ;
    }
    else if (lastNoseX < noseX){
      push();
      translate(width, 0);
      scale(-1, 1);
      image(images[index], noseX - d, noseY - d);
      pop();
    }


    // for (var i = 0; i < 12; i++) {
    //       translate(positionStone[i] , y);
    //       image(imgStone, i*50 , -100 / 2, 100, 100);
    // }
    index = (index + 1);
    if (index == 12) {
      index = 0;
    }
  }
}
