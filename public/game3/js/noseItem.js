class NoseItem {
	constructor(){
		this.r = 150;
		this.globalSize = height;
		this.x = this.r;
		this.y = (this.globalSize - this.r);
		this.vy = 0;
		this.gravity = 1;
		this.index = 0;
		this.isJumping = false;
		this.groundHeight = 70;
	}

	hits(ennemie){
		ellipseMode(CENTER);

		let x1 = this.x + this.r * 0.5;
		let y1 = this.y + this.r * 0.5;
		let x2 = ennemie.x + ennemie.r * 0.5;
		let y2 = ennemie.y + ennemie.r * 0.5;
		return collideCircleCircle(x1, y1, this.r, x2, y2, ennemie.r);
	}

	hitsStep(step){
		let x1 = this.x;
		let y1 = this.y;
		rectMode(CORNER);
		ellipseMode(CENTER);
		return collideRectCircle(step.x, step.y, step.xSize, step.ySize, x1, y1, this.r);
	}
	hitsStepFromUnder(step){
		let stepLeftTop = [step.x, step.y];
		let stepRightTop = [(step.x+step.xSize), step.y];
		let stepLeftBot = [step.x, (step.y+step.ySize)];
		let stepRightBot = [(step.x+step.xSize), (step.y+step.ySize)];
		let xCircle = this.x + this.r * 0.5;
		let yCircle = this.y + this.r * 0.5;
		let yCircleBottom = this.y - this.r;
		let xCircleBottom = this.x + this.r;

		ellipseMode(CENTER);
		let collision;
		// if the center of the circle is under the box
		if (yCircle > stepLeftBot[1]) { 
				collision = true;
			}
			else collision = false;
		return collision
	}

	jump(){
		if (!this.isJumping ) {
			this.vy = -25;
			this.isJumping = true; 
		}
	}
	move(){
		this.y += this.vy;
		this.y = constrain(this.y, 0, height - this.r);
		if (this.isJumping) {
			this.vy += this.gravity;
		}
		//if the charac reach the floor
		if (this.y == height-this.r) { 
			this.isJumping = false;
		 }
	}
	show(){
		if (!this.isJumping) {
	        if (this.index >= 31) {
	            this.index = 0;
	        }
			image(runImg[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5), this.r, this.r);
	        this.index = (this.index + 1);

    		fill(255, 50);
			ellipseMode(CENTER);
	        ellipse(this.x, this.y, this.r );
	        fill(255, 0, 255);
    		ellipse(this.x, this.y, 10 );

		}
		else if(this.isJumping){
			image(runImg[40],(this.x-this.r*0.5), (this.y-this.r*0.5), this.r, this.r);
			ellipse(this.x, this.y, this.r, this.r )
	        fill(255, 0, 255);
    		ellipse(this.x, this.y, 10);
		} 
	}
	setBckGdHeight(element){
		this.groundHeight = element;
	}
}



// drawNosePerson() {
//         push();
//         frameRate(70);
//         //if the difference between the two noses position is big enough and if we are not already jumping
//         if (lastNoseY - noseY > 10 && !this.isJumping) {
//             this.isJumping = true;
//             this.bodyPosition = height-220;
//             this.coef = ceil(lastNoseY - noseY)/10;
//             if (this.coef > 5) {//coef can output 4 diff coef meaning 4 jumps size
//                 this.coef = 5;
//             }
//             this.jumpSize = this.bodyPosition - this.coef*80;
//         }
//         if (this.isJumping) {
//             //if the perso is on the jumping part of his jump 
//             if (this.bodyPosition > this.jumpSize && this.goingUp) {
//                 this.bodyPosition -= this.coef*5;
//                 image(runImg[39], width - width/2 - 50, this.bodyPosition, 150 , 150);  
//             }
//             //perso slow down when approach the top
//             if (this.bodyPosition > this.jumpSize-90 && this.goingUp) {
//                 this.bodyPosition -= this.coef;
//                 image(runImg[40], width - width/2 - 50, this.bodyPosition, 150 , 150);  
//             }
//             //if the body is on the top of his jump
//             else if (this.bodyPosition <= this.jumpSize && this.goingUp){
//                 this.goingUp = false;
//             }
//             //if the perso is on the fall 
//             else if (this.bodyPosition <= height-220 && !this.goingUp){
//                 this.bodyPosition += this.coef*2;
//                 image(runImg[47], width - width/2 - 50, this.bodyPosition, 150 , 150);
//             }
//             //if perso have reach the floor
//             else if (this.bodyPosition > height-220){
//                 this.goingUp = true;
//                 this.isJumping = false;
//             }
//         }
//         else image(runImg[this.index], width - width/2 - 50, height - 220, 150 , 150);
//         //create the animation of the perso
//         this.index = (this.index + 1);
//         if (this.index == 31) {
//             this.index = 0;
//         }
//     pop();
//     }