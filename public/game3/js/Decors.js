class Decors{
	constructor(step, xSize){
		this.step = step;
		this.nbrOfStepsFromGround = (step*100)+70;
		this.xSize = xSize;
		this.ySize = 30;
		this.x = width;
		this.y = height - this.ySize -this.nbrOfStepsFromGround;
		this.isActive = false;
	}

	move(){
		this.x -= 10; 
	}
	show(){
		// image(stoneImg, this.x, this.y-70, this.r, this.r);
		fill(0, 50);
        rect(this.x, this.y, this.xSize, this.ySize )
	}

	getHeight(){
		return this.nbrOfStepsFromGround;
	}
}