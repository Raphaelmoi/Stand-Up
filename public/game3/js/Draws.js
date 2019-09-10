/*
Contain methods called from the draw function in sketches.js
drawBird()
drawExplosion()
drawHealthAndText()
drawStones()
drawGems()
drawPotionsOrPills()
*/
class Draws {
    constructor() {
        this.explosionX = 0;
        this.explosionY = 0;
        this.explosion = false;
        this.exploseindex = 0;
        this.index = [0 , 0, -150, -150,-300 ,-300, -450, -450]; //make a difference beetwen each laser
        this.trajectory = [0 , 0, 0, 0, 0 , 0, 0, 0];
    }

    drawsEverything(){
        this.drawNoseShip();
        this.drawLeftEarship();
        this.drawRightEarship();
        this.drawStones();
        this.drawGems();
        this.drawPotionsOrPills(pills);
        this.drawPotionsOrPills(potions);
        this.drawHealthAndText();
        this.drawAmmo();
        this.drawExplosion();
        if(fallingSpaceShipL){
            this.drawNewSpaceShip(0);
        }
        if (fallingSpaceShipR) {
            this.drawNewSpaceShip(1);
        }
    }
    drawNoseShip() {
        image(astroImg, width - noseX - 50, noseY - 50, 180*screenSizeAdaptator, 180*screenSizeAdaptator);
    }
    drawLeftEarship(){
        if (leftShipLife > 0) {
            image(spaceShipLeftEar, width - leftEarX - 40*screenSizeAdaptator, leftEarY - 40*screenSizeAdaptator, 80*screenSizeAdaptator, 80*screenSizeAdaptator);
            if(ammoL> 0){
                this.drawLaser(leftEarX, leftEarY, laserLeftImg, 0, 28*screenSizeAdaptator);
                this.drawLaser(leftEarX, leftEarY, laserLeftImg, 2, 28*screenSizeAdaptator);   
                this.drawLaser(leftEarX, leftEarY, laserLeftImg, 4, -42*screenSizeAdaptator);
                this.drawLaser(leftEarX, leftEarY , laserLeftImg, 6, -42*screenSizeAdaptator);
                ammoL -=4;
            }            
        }
    }
    drawRightEarship(){
        if (rightShipLife > 0) {
            image(spaceShipRightEar, width - rightEarX - 40*screenSizeAdaptator, rightEarY - 40*screenSizeAdaptator, 80*screenSizeAdaptator, 80*screenSizeAdaptator);  
            if (ammoR > 0) {
                this.drawLaser(rightEarX, rightEarY, laserRightImg, 1, 28*screenSizeAdaptator );
                this.drawLaser(rightEarX, rightEarY, laserRightImg, 3, 28*screenSizeAdaptator);   
                this.drawLaser(rightEarX, rightEarY, laserRightImg, 5, -42*screenSizeAdaptator);
                this.drawLaser(rightEarX, rightEarY , laserRightImg, 7, -42*screenSizeAdaptator);
                ammoR -=4;
            }                  
        }
    }
    drawLaser(x, y, imageLaser, id, side){
        laserX = x - side ;
        laserY = y- 50 - this.index[id];
        //if index is 0, the origin of the shoot is the ship
        if (this.index[id] == 0) {
            this.trajectory[id] = laserX;
        } //the speed
        this.index[id] += 40; 
        //hide the laser until is bigger than 0
        if(this.index[id] > 0){
            image(imageLaser, width - laserX, laserY);    
        }
        this.shootStone(laserX, laserY);
        //reset values if laser is out the screen
        if (this.index[id] > (height*0.5)){
            this.index[id] = 0 ;
            this.trajectory[id] = 0;
        }
    }
    shootStone(x, y){
        for (var i = 0; i < stones.length; i++) {
            if (stones[i].isOver(width, x, y)) {
                this.explosionX = stones[i].position.x;
                this.explosionY = stones[i].currentYPosition();
                stones.splice(i, 1);
                this.explosion = true;
                util.newStone(1);
                explosedStones ++;
            }            
        }
    }
    drawStones() {
        for (var i = stones.length - 1; i >= 0; i--) {
            stones[i].display();
            if (stones[i].isOver(width, noseX, noseY) ) {
                asstroLife = asstroLife + stones[i].getSante();
                this.explosionXY(stones[i].position.x, stones[i].currentYPosition(), stones, i);
            }
            else if (leftShipLife > 0 && stones[i].isOver(width, leftEarX, leftEarY) ) {
                leftShipLife = leftShipLife + stones[i].getSante();
                this.explosionXY(stones[i].position.x, stones[i].currentYPosition(), stones, i);
            }
            else if (rightShipLife >  0 && stones[i].isOver(width, rightEarX, rightEarY) ) {
                rightShipLife = rightShipLife + stones[i].getSante();
                this.explosionXY(stones[i].position.x, stones[i].currentYPosition(), stones, i);
            }
            if (leftShipLife < 0) {
                leftShipLife = 0;
                util.newSpaceShip(0);
            }
            else if (rightShipLife < 0) {
                rightShipLife = 0;
                util.newSpaceShip(1);
            } 
            if (stones[i].currentYPosition() >= height) {
                stones.splice(i, 1);
                util.newStone(1);
            }
        }
    }
    explosionXY(x, y, item, i){
        this.explosionX = x;
        this.explosionY = y;
        item.splice(i, 1);
        this.explosion = true;
    }
    drawGems() {
        for (var i = boxGems.length - 1; i >= 0; i--) {
            boxGems[i].display();
            if (boxGems[i].isOver(width, noseX, noseY)) {
                boxGems.splice(i, 1);
                collectedGems++;
                catchGemSound.play();
                util.newGem(1);
            }
            if (boxGems[i].currentYPosition() > height) {
                boxGems.splice(i, 1);
                util.newGem(1);
            }
        }
    }
    drawPotionsOrPills(choice) {
        for (var i = choice.length - 1; i >= 0; i--) {
            choice[i].display();
            if (choice[i].isOver(width, noseX, noseY)) {
                if (leftShipLife > 0) {
                    leftShipLife = leftShipLife + (choice[i].getSante()/2);
                    if (leftShipLife > 50) { leftShipLife = 50;}
                }
                if (rightShipLife > 0) {
                    rightShipLife = rightShipLife + (choice[i].getSante()/2);
                    if (rightShipLife > 50) { rightShipLife = 50;}     
                }
                catchGemSound.play();
                choice.splice(i, 1);
                if (choice == pills) {
                    util.newPill(1);
                } else {
                    util.newPotion(1);
                }
                if (choice[i].currentYPosition() > height) {
                    choice.splice(i, 1);
                    if (choice == pills) {
                        util.newPill(1);
                    } else {
                        util.newPotion(1);
                    }
                }
            }
        }
    }
    drawAmmo(){
        for (var i = ammos.length - 1; i >= 0; i--) {
            ammos[i].display();
            if (ammos[i].isOver(width, noseX, noseY)) {
                ammoL += ammos[i].getAmmo()/2;
                ammoR += ammos[i].getAmmo()/2;
                catchGemSound.play();
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            else if (ammos[i].isOver(width, leftEarX, leftEarY)) {
                ammoL += ammos[i].getAmmo();
                catchGemSound.play();
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            else if (ammos[i].isOver(width, rightEarX, rightEarY)) {
                ammoR += ammos[i].getAmmo();
                catchGemSound.play();
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            if (ammos[i].currentYPosition() > height) {
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            if (ammoL>3000) { ammoL =3000;}
            if (ammoR>3000) { ammoR =3000;}
        }
    }
    drawNewSpaceShip(side){
        if (side == 0) {
            newSpaceShipL.display();
            if (newSpaceShipL.isOver(width, noseX, noseY)) {
                fallingSpaceShipL= false;
                leftShipLife = 50;
                ammoL = 1200;
                catchGemSound.play();
            }
            if (newSpaceShipL.currentYPosition() > height) {
                fallingSpaceShipL= false;
                util.newSpaceShip(0);
            }
        }
        if (side == 1) {
            newSpaceShipR.display();
            if (newSpaceShipR.isOver(width, noseX, noseY)) {
                fallingSpaceShipR= false;
                rightShipLife = 50;
                ammoR = 1200;
                catchGemSound.play();
            }
            if (newSpaceShipR.currentYPosition() > height) {
                fallingSpaceShipR= false;
                util.newSpaceShip(1);
            }
        }            
    }
    drawExplosion() {
        if (this.explosion) {
            explosionSound.play();
            image(explose[this.exploseindex], this.explosionX - 50, this.explosionY - 50);
            this.exploseindex += 1;
        }
        if (this.exploseindex == 6) {
            this.exploseindex = 0;
            this.explosion = false;
        }
    }
    drawHealthAndText() {
        //health bar
        noStroke();
        fill(255);
        textSize(16*screenSizeAdaptator);
        textAlign(LEFT);
        text("Vaisseau bleu", 18*screenSizeAdaptator, 19*screenSizeAdaptator);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(18*screenSizeAdaptator, 28*screenSizeAdaptator, 250*screenSizeAdaptator, 22*screenSizeAdaptator);
        noStroke();
        fill(81, 221, 37);
        rect(19*screenSizeAdaptator, 28*screenSizeAdaptator, map(leftShipLife, 0, 50, 0, 248*screenSizeAdaptator), 21*screenSizeAdaptator);
        noStroke();        
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(280*screenSizeAdaptator, 28*screenSizeAdaptator, 150*screenSizeAdaptator, 22*screenSizeAdaptator);
        noStroke();
        fill(93, 64, 56);
        rect(280*screenSizeAdaptator, 29*screenSizeAdaptator, map(ammoL, 0, 3000, 0, 150*screenSizeAdaptator), 20*screenSizeAdaptator);
        fill(255);
        text('Munitions' , 282*screenSizeAdaptator, 19*screenSizeAdaptator)
        text(ammoL, 282*screenSizeAdaptator, 44*screenSizeAdaptator);

        text("Vaisseau orange", 18*screenSizeAdaptator, 72*screenSizeAdaptator);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(18*screenSizeAdaptator, 80*screenSizeAdaptator, 250*screenSizeAdaptator, 22*screenSizeAdaptator);
        noStroke();
        fill(81, 221, 37);
        rect(19*screenSizeAdaptator, 80*screenSizeAdaptator, map(rightShipLife, 0, 50, 0, 248*screenSizeAdaptator), 21*screenSizeAdaptator);
        noStroke();        
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(280*screenSizeAdaptator, 80*screenSizeAdaptator, 150*screenSizeAdaptator, 22*screenSizeAdaptator);
        noStroke();
        fill(93, 64, 56);
        rect(280*screenSizeAdaptator, 81*screenSizeAdaptator, map(ammoR, 0, 3000, 0, 150*screenSizeAdaptator), 20*screenSizeAdaptator);
        fill(255);
        text('Munitions' , 282*screenSizeAdaptator, 72*screenSizeAdaptator)
        text(ammoR, 282*screenSizeAdaptator, 98*screenSizeAdaptator);


        //Points
        push();
        textAlign(CENTER);
        fill(255);
        text("Niveau " + level, width / 2, 30);
        textAlign(RIGHT);
        fill(255);
        text(" Score : ", width - 120, 30);
        textSize(24);
        text((collectedGems * level) + explosedStones, width - 50, 30);
        pop();
    }
}