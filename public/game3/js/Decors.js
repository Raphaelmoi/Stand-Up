class Decors{
	constructor(step, qttBlock){
		this.step = step;
		this.qttBlock = qttBlock;
		this.nbrOfStepsFromGround = (step*100)+70;
		this.xSize = qttBlock * 100;
		this.ySize = 60;
		this.x = width;
		this.y = height - this.ySize -this.nbrOfStepsFromGround;
		this.isActive = false;
	}

	move(){
		this.x -= 10; 
	}
	show(){

		for (var i = 0; i < this.qttBlock; i++) {
			if (i == 0) {
				image(stepImgBegin, (this.x + i*100 ), this.y, 100, this.ySize);
			}
			else if (i == this.qttBlock - 1){
				image(stepImgEnd, (this.x + i*100 ), this.y, 100, this.ySize);
			}
			else image(stepImg, (this.x + i*100 ), this.y, 100, this.ySize);

		}


		// image(stepImg, this.x, this.y, this.xSize, this.ySize);
		// fill(0, 50);
  //       rect(this.x, this.y, this.xSize, this.ySize )
	}

	getHeight(){
		return this.nbrOfStepsFromGround;
	}
}