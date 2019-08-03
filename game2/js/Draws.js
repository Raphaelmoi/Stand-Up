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
        this.trajectory = [0 , 0, 0, 0, 0 , 0, 0, 0];

    }
    drawNoseShip() {
        image(spaceShip, width - noseX - 50, noseY - 50);
    }
    drawLeftHandship(){
        image(spaceShipLeftHand, width - leftHandX - 50, leftHandY - 50);
    }
    drawRightHandship(){
        image(spaceShipRightHand, width - rightHandX - 50, rightHandY - 50);  
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
        // console.log('x :' + x);
        // console.log('y :' + y);


        for (var i = 0; i < stones.length; i++) {
            if (stones[i].isOver(width, x, y)) {
                let currentY = stones[i].currentYPosition();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                console.log('test');
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
            if (stones[i].isOver(width, noseX, noseY)) {
                life = life + stones[i].getSante();
                this.explosionX = stones[i].position.x;
                this.explosionY = currentY;
                stones.splice(i, 1);
                this.explosion = true;
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
                life = life + choice[i].getSante();
                if (life >= 100) {
                    life = 100;
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
        text("Niveau " + level, width / 2, 30);
        textAlign(RIGHT);
        fill(255);
        text(" Score : ", width - 80, 30);
        textSize(24);
        text(score * level, width - 50, 30);
        pop();
    }
}