class Decors{
	constructor(step, qttBlock, yBlock){
		this.nbrOfStepsFromGround = (step*100)+70;
		this.xSize = qttBlock * 100;
		this.ySize = yBlock * 60;
		this.x = width;
		this.y = height - this.ySize - this.nbrOfStepsFromGround;
		this.nbrOfLine = yBlock;
	}

	move(){
		this.x -= 10; 
	}
	show(){
		for (var j = 0; j < this.nbrOfLine; j++) {
			let yPosition = this.y + 60 * j;

			if (j == 0 ) {
				for (var i = 0; i < this.qttBlock; i++) {

					if (i == 0) {
						image(this.imgStart, (this.x + i*100 ), yPosition, 100, 60);
					}
					else if (i == this.qttBlock - 1){
						image(this.imgEnd, (this.x + i*100 ), yPosition, 100, 60);
					}
					else image(this.imgCenter, (this.x + i*100 ), yPosition, 100, 60);
				}
			}
			else if (j != 0){
				for (var i = 0; i < this.qttBlock; i++) {
					image(blockEarthImg, (this.x + i*100 ), yPosition, 100, 60);
				}
			}
		}

		// image(stepImg, this.x, this.y, this.xSize, this.ySize);
		// fill(0, 50);
  //       rect(this.x, this.y, this.xSize, this.ySize )
	}

	getHeight(){
		return this.nbrOfStepsFromGround;
	}
}