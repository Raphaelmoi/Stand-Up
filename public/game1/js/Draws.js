/*
Contain methods called from the draw function in sketchs.js
drawBird()
drawExplosion()
drawHealthAndText()
drawStones()
drawGems()
drawPotionsOrPills()
drawBackground()
*/
class Draws {
    constructor() {
        this.explosionX = 0;
        this.explosionY = 0;
        this.explosion = false;
        this.exploseindex = 0;
        this.index = 0; //will allowed to move from one image to another in birdImages
    }
    drawBird() {
        if (lastNoseX - noseX > -10) { //-10 give a direction when player dont move
            image(bird[this.index], width - noseX - 50, noseY - 50);
        } else if (lastNoseX - noseX < -10) {
            push();
            translate(width, 0);
            scale(-1, 1);
            image(bird[this.index], noseX - 50, noseY - 50);
            pop();
        }
        //create the animation of the bird
        this.index = (this.index + 1);
        if (this.index == 12) {
            this.index = 0;
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
    drawBackground(){
        translate(width, 0);
        scale(-1, 1);
        image(imgBackground, 0, xFirstBackground, width, height);
        image(imgBackgroundDeux, 0, xSecndBackground, width, height);

        xFirstBackground += scrollSpeed;
        xSecndBackground += scrollSpeed;

        if (xFirstBackground >= height){
          xFirstBackground = -height;
        }
        if (xSecndBackground >= height){
          xSecndBackground = -height;
        }
    }
}