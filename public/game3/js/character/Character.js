class Character {
	constructor(){	
	}

	hits(ennemie){
		ellipseMode(CENTER);
		let x1 = this.x + this.r  * 0.5;
		let y1 = this.y + this.r  * 0.5;
		let x2 = ennemie.x;
		let y2 = ennemie.y + ennemie.r * 0.5;
		return collideCircleCircle(x1, y1, this.r, x2, y2, ennemie.r);
	}

	hitsStep(step){
		rectMode(CORNER);
		return collideRectCircle(step.x, step.y, step.xSize, step.ySize, this.x, this.y, this.r);
	}
	hitsStepFromUnder(step){
		let stepBorderBottom = step.y+step.ySize;
		let yCircle = this.y + this.r * 0.5;
		let collision;
		// if the center of the circle is under the box
		if (yCircle > stepBorderBottom) { 
				collision = true;
			}
			else collision = false;
		return collision
	}

	hitsStepFromRight(step){
		let stepBorderRight = step.x+step.xSize;
		let xCircle = this.x + this.r * 0.5;
		let collision;
		// if the center of the circle is under the box
			if (xCircle == stepBorderRight + 10 && xCircle >= stepBorderRight - 10 ) {
				collision = true;
			}
			else collision = false;
		return collision
	}

	hitsStepFromLeft(step){
		let stepBorderLeft = step.x;
		let xCircle = this.x + this.r* 0.5;
		let collision;
		// if the center of the circle is under the box
			if (xCircle == stepBorderLeft + 10 && xCircle >= stepBorderLeft - 10 ) {
				collision = true;
			}
			else collision = false;
		return collision
	}

	interactionWithDecors(){
        let decors = [flyingStep, blocStep];

		for (var j = 0; j < decors.length; j++) {
			for (var i = decors[j].length - 1; i >= 0; i--) {
				if (this.hitsStep(decors[j][i])){
					if (this.hitsStepFromUnder(decors[j][i])) {
						this.vy = 10;
					}
					else{
						this.y = decors[j][i].y - (this.r*0.5);
						this.isJumping = false;
					}
				}
			}
		}
	}
}