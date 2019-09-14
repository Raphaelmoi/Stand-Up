class Character {
	constructor(){	
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
}