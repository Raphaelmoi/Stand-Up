class NoseItem extends Character{
	constructor(){
		super();
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

	jumpWithNose(){
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
		}
		else if(this.isJumping){
			image(runImg[40],(this.x-this.r*0.5), (this.y-this.r*0.5), this.r, this.r);
		} 
	}
	// setBckGdHeight(element){
	// 	this.groundHeight = element;
	// }
}

	// hits(ennemie){
	// 	ellipseMode(CENTER);
	// 	let x1 = this.x + this.r * 0.5;
	// 	let y1 = this.y + this.r * 0.5;
	// 	let x2 = ennemie.x + ennemie.r * 0.5;
	// 	let y2 = ennemie.y + ennemie.r * 0.5;
	// 	return collideCircleCircle(x1, y1, this.r, x2, y2, ennemie.r);
	// }

	// hitsStep(step){
	// 	rectMode(CORNER);
	// 	return collideRectCircle(step.x, step.y, step.xSize, step.ySize, this.x, this.y, this.r);
	// }
	// hitsStepFromUnder(step){

	// 	let stepBorderBottom = step.y+step.ySize;
	// 	let yCircle = this.y + this.r * 0.5;
	// 	let collision;
	// 	// if the center of the circle is under the box
	// 	if (yCircle > stepBorderBottom) { 
	// 			collision = true;
	// 		}
	// 		else collision = false;
	// 	return collision
	// }