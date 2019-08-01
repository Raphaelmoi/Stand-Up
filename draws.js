/*
Contain fonctions called from the draw function in sketches.js
drawBird()
drawExplosion()
drawHealthAndText()
drawStones()
drawGems()
drawPotionsOrPills()
*/
function drawBird(){
    if (lastNoseX - noseX > -10 ) {//-10 give a direction when player dont move
        image(bird[index], width - noseX-50, noseY-50);
    }
    else if (lastNoseX - noseX < -10){
        push();
        translate(width, 0);
        scale(-1, 1);
        image(bird[index], noseX-50, noseY-50);
        pop();
    }
    //create the animation of the bird
    index = (index + 1);
    if (index == 12) {
      index = 0;
    }
}
function drawExplosion(){
    if (explosion) {
        explosionSound.play();
        image(explose[exploseindex], explosionX -50, explosionY -50);  
        exploseindex += 1;
    }
    if (exploseindex == 6) {
        exploseindex = 0;
        explosion = false;
    }
}
function drawHealthAndText(){
    //health bar
    noStroke();
    fill(255);
    textSize(20);
    text("Santé", 45, 20);
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(18, 28, 250, 22);
    noStroke();
    fill(81, 221, 37);
    rect(19, 28, map(life, 0, 100, 0, 248), 21);
    //Points
    push();
    textAlign(CENTER);
    fill(255);
    text("Niveau " + level , width/2 , 30);
    textAlign(RIGHT);
    fill(255);
    text(" Score : ", width-80, 30);
    textSize(24);
    text(score*level, width-50, 30);
    pop();
}

function drawStones(){
    for (var i = stones.length - 1; i >= 0; i--) {
        let currentY = stones[i].currentYPosition();
        stones[i].display();
        if (stones[i].isOver(width, noseX, noseY)) {
            life = life + stones[i].getSante();
            explosionX = stones[i].position.x;
            explosionY = currentY;
            stones.splice(i, 1);
            explosion = true;
        }
        if(currentY > height){
            stones.splice(i, 1);
            newStone(1);
        }   
    }
}
function drawGems(){
    for (var i = boxGems.length - 1; i >= 0; i--) {
        let currentY =  boxGems[i].currentYPosition();
        boxGems[i].display();
        if (boxGems[i].isOver(width, noseX, noseY)) {
            boxGems.splice(i, 1);
            score++;
            catchGemSound.play();
            newGem(1);
        } 
        if(currentY > height){
            boxGems.splice(i, 1);
            newGem(1);
        } 
    }
}
function drawPotionsOrPills(choice){
    let object;
    if (choice == pills) {
        object = Pill;
    }
    else {
        object = Potion;
    }
    for (var i = choice.length - 1; i >= 0; i--) {
        let currentY = choice[i].currentYPosition();
        choice[i].display();
        if (choice[i].isOver(width, noseX, noseY)) {
            catchGemSound.play();
            life = life + choice[i].getSante();
            if (life >= 100 ) {
                life = 100;
            } 
            choice.splice(i, 1); 
            choice.push(new object  (random(0, width)));    
        } 
        if(currentY > height){
            choice.splice(i, 1);
            choice.push(new object  (random(0, width)));    
        } 
    }
}

