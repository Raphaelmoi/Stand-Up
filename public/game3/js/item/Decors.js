class Decors{
	constructor(step, qttBlock, yBlock){
		this.ySizeBox = 60;
		this.xSizeBox = 100;
		this.nbrOfStepsFromGround = (step*this.xSizeBox)+this.ySizeBox;
		this.xSize = qttBlock * this.xSizeBox;
		this.ySize = yBlock *this.ySizeBox;
		this.x = width;
		this.y = height - this.ySize - this.nbrOfStepsFromGround;
		this.nbrOfLine = yBlock;
	}

	move(){
		this.x -= 10; 
	}
	show(){
		for (var j = 0; j < this.nbrOfLine; j++) {
			let yPosition = this.y + this.ySizeBox * j;

			if (j == 0 ) {
				for (var i = 0; i < this.qttBlock; i++) {

					if ( i == 0 ) {
						image(this.imgStart, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox);
					}
					else if ( i == this.qttBlock - 1){
						image(this.imgEnd, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox);
					}
					else image(this.imgCenter, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox);
				}
			}
			else if (j != 0){
				for (var i = 0; i < this.qttBlock; i++) {
					if ( i == 0 ) {
						image(borderLeftImg, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox+5);
					}

					else if (i == this.qttBlock - 1){
						image(borderRightImg, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox+5);
					}
					else image(blockEarthImg, (this.x + i*this.xSizeBox ), yPosition, this.xSizeBox, this.ySizeBox+5);
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