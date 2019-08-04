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
        this.index = [0 , 0, -150, -150,-300 ,-300, -450, -450]; //will allowed to move fom one image to another in birdImages
        //this.index = [0 , -150,-300, -450]; //will allowed to move fom one image to another in birdImages
        this.trajectory = [0 , 0, 0, 0, 0 , 0, 0, 0];
        //this.trajectory = [0 , 0, 0, 0];
        // this.asstroIndex = 0;
    }
    drawNoseShip() {
        image(astro3, width - noseX - 50, noseY - 50, 150, 150);
    }
    drawLeftHandship(){
        if (leftShipLife > 0) {
            image(spaceShipLeftHand, width - leftHandX - 50, leftHandY - 50);
            if(ammoL> 0){
                this.drawLaser(leftHandX, leftHandY, laserLeftImg, 0, 30);
                this.drawLaser(leftHandX, leftHandY, laserLeftImg, 2, 30);   
                this.drawLaser(leftHandX, leftHandY, laserLeftImg, 4, -30);
                this.drawLaser(leftHandX, leftHandY , laserLeftImg, 6, -30);
                ammoL -=4;
            }            
        }
    }
    drawRightHandship(){
        if (rightShipLife > 0) {
            image(spaceShipRightHand, width - rightHandX - 50, rightHandY - 50);  
            if (ammoR > 0) {
                this.drawLaser(rightHandX, rightHandY, laserRightImg, 1, 30);
                this.drawLaser(rightHandX, rightHandY, laserRightImg, 3, 30);   
                this.drawLaser(rightHandX, rightHandY, laserRightImg, 5, -30);
                this.drawLaser(rightHandX, rightHandY , laserRightImg, 7, -30);
                ammoR -=4;
            }
                    

        }
    }

    drawLaser(x, y, imageLaser, id, side){
        laserX = x - side ;
        laserY = y -50 - this.index[id];
        //if index is 0, the origin of the shoot is the ship
        if (this.index[id] == 0) {
            this.trajectory[id] = laserX;
        }
        //the speed
        this.index[id] += 40; 
        //hide the laser until is bigger than 0
        if(this.index[id] > 0){
            //ellipse(width - laserX, laserY- 50, 30, 30,)
            image(imageLaser, width - laserX, laserY- 50);    
        }
        this.shootStone(laserX, laserY-50 );
        //reset values if laser is out the screen
        if (this.index[id] > (height*0.5)){
            this.index[id] = 0 ;
            this.trajectory[id] = 0;
        }
    }

    shootStone(x, y){
        for (var i = 0; i < stones.length; i++) {
            if (stones[i].isOver(width, x, y)) {
                let currentY = stones[i].currentYPosition();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                stones.splice(i, 1);
                this.explosion = true;
                util.newStone(1);
            }            
        }
    }

    drawStones() {
        for (var i = stones.length - 1; i >= 0; i--) {
            let currentY = stones[i].currentYPosition();
            stones[i].display();
            if (stones[i].isOver(width, noseX, noseY) ) {
                asstroLife = asstroLife + stones[i].getSante();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                stones.splice(i, 1);
                this.explosion = true;
            }
            if (leftShipLife > 0 && stones[i].isOver(width, leftHandX, leftHandY) ) {
                leftShipLife = leftShipLife + stones[i].getSante();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                stones.splice(i, 1);
                this.explosion = true;
            }
            if (rightShipLife >  0 && stones[i].isOver(width, rightHandX, rightHandY) ) {
                rightShipLife = rightShipLife + stones[i].getSante();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                stones.splice(i, 1);
                this.explosion = true;
            }
            if (leftShipLife < 0) {
                leftShipLife = 0;
                util.newSpaceShip(0);
            }
            if (rightShipLife < 0) {
                rightShipLife = 0;
                util.newSpaceShip(1);
            } 
            if (currentY > height) {
                stones.splice(i, 1);
                util.newStone(1);
            }
        }
    }
    drawGems() {
        for (var i = boxGems.length - 1; i >= 0; i--) {
            let currentY = boxGems[i].currentYPosition();
            boxGems[i].display();
            if (boxGems[i].isOver(width, noseX, noseY)) {
                boxGems.splice(i, 1);
                score++;
                catchGemSound.play();
                util.newGem(1);
            }
            if (currentY > height) {
                boxGems.splice(i, 1);
                util.newGem(1);
            }
        }
    }
    drawPotionsOrPills(choice) {
        for (var i = choice.length - 1; i >= 0; i--) {
            let currentY = choice[i].currentYPosition();
            choice[i].display();
            if (choice[i].isOver(width, noseX, noseY)) {
                catchGemSound.play();
                if (leftShipLife > 0) {
                    leftShipLife = leftShipLife + (choice[i].getSante()/2);
                    if (leftShipLife > 50) { leftShipLife = 50;}
                }
                if (rightShipLife > 0) {
                    rightShipLife = rightShipLife + (choice[i].getSante()/2);
                    if (rightShipLife > 50) { rightShipLife = 50;}     
                }
                choice.splice(i, 1);
                if (choice == pills) {
                    util.newPill(1);
                } else {
                    util.newPotion(1);
                }

                if (currentY > height) {
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
            let currentY = ammos[i].currentYPosition();
            ammos[i].display();
            if (ammos[i].isOver(width, noseX, noseY)) {
                ammoL += ammos[i].getAmmo()/2;
                ammoR += ammos[i].getAmmo()/2;
                ammos.splice(i, 1);
                catchGemSound.play();
                util.newAmmo(1);
            }
            if (ammos[i].isOver(width, leftHandX, leftHandY)) {
                ammoL += ammos[i].getAmmo();
                catchGemSound.play();
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            if (ammos[i].isOver(width, rightHandX, rightHandY)) {
                ammoR += ammos[i].getAmmo();
                catchGemSound.play();
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
            if (currentY > height) {
                ammos.splice(i, 1);
                util.newAmmo(1);
            }
        }
    }

    drawNewSpaceShip(side){
        if (side == 0) {
            let currentY = newSpaceShiftL.currentYPosition();
            newSpaceShiftL.display();
            if (newSpaceShiftL.isOver(width, noseX, noseY)) {
                fallingSpaceShipL= false;
                leftShipLife = 50;
                ammoL = 1200;
                catchGemSound.play();
            }
            if (currentY > height) {
                fallingSpaceShipL= false;
                util.newSpaceShip(0);
            }
        }
        
        if (side == 1) {
            let currentY = newSpaceShiftR.currentYPosition();
            newSpaceShiftR.display();
            if (newSpaceShiftR.isOver(width, noseX, noseY)) {
                fallingSpaceShipR= false;
                rightShipLife = 50;
                ammoR = 1200;
                catchGemSound.play();
            }
            if (currentY > height) {
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
        textSize(20);
        text("UFO gauche", 100, 20);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(18, 28, 250, 22);
        noStroke();
        fill(81, 221, 37);
        rect(19, 28, map(leftShipLife, 0, 50, 0, 248), 21);
        
        fill(255);
        text("UFO droite", 100, 75);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(18, 80, 250, 22);
        noStroke();
        fill(81, 221, 37);
        rect(19, 80, map(rightShipLife, 0, 50, 0, 248), 21);
        //Points
        push();
        textAlign(CENTER);
        fill(255);
        text("Niveau " + level, width / 2, 30);
        textAlign(RIGHT);
        fill(255);
        text(" Score : ", width - 80, 30);
        textSize(24);
        text(score * level, width - 50, 30);
        pop();
    }
}