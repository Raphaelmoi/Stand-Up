class Dragon extends Character{
	constructor(){
		super();
		this.r = 130;
		this.x = width ;
		this.y = height - this.r;
		this.groundHeight = 22;
		this.index = 0;
		this.speed = 16;
		this.directionIsLeft = true;
	}
	move(){
		this.x -= this.speed; 
	}
	show(){
		for (var i = blocStep.length - 1; i >= 0; i--) {
			// if (super.hitsStep(blocStep[i])) {
				if (super.hitsStepFromRight(blocStep[i])) {
					this.speed = 0;
					this.directionIsLeft = false;
				}
				else if (super.hitsStepFromLeft(blocStep[i])){
					this.speed = 16;
					this.directionIsLeft = true;
				}
			// }
		}			

		if (this.directionIsLeft) {
			image(dragonImgBox[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5)+this.groundHeight, this.r, this.r);
		}else{
			image(dragonImgBoxRight[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5)+this.groundHeight, this.r, this.r);
		}

	    this.index = (this.index + 1);
	    if (this.index >= dragonImgBox.length) {
	        this.index = 0;
	    }
	}
}