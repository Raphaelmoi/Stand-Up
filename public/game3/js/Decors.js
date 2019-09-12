class Decors{
	constructor(nbrOfStepsFromGround, xSize){
		this.nbrOfStepsFromGround = (nbrOfStepsFromGround*100)+70;
		this.xSize = xSize;
		this.ySize = 30;
		this.x = width;
		this.y = height - this.ySize -this.nbrOfStepsFromGround;
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