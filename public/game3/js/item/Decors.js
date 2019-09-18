class Decors{
	// step -> floor number
	//qttBlock ->multiplicator determine the total size of the block
	//yBlock -> determine the quantity of earth behind the top floor
	constructor(step, qttBlock, yBlock){
		this.ySizeBox = 100;
		this.xSizeBox = 100;
		this.step = step;
		this.xSize = qttBlock * this.xSizeBox;
		this.ySize = yBlock *this.ySizeBox;
		this.x = width;
		this.y = height - ((step*this.ySizeBox)+this.ySizeBox);
		this.nbrOfLine = yBlock;
	}

	move(){
		this.x -= 10; 
	}
	show(){
		for (var j = this.nbrOfLine -1; j >= 0; j--) {

			let yPosition = this.y +(this.ySizeBox * j);
			// else if (j ==1) {}
			if (j != 0){
				for (var i = 0; i < this.qttBlock; i++) {
					if ( i == 0 ) {
						image(borderLeftImg, (this.x + i*this.xSizeBox ), yPosition-(this.ySizeBox*0.57), this.xSizeBox, this.ySizeBox);
					}

					else if (i == this.qttBlock - 1){
						image(borderRightImg, (this.x + i*this.xSizeBox ), yPosition-(this.ySizeBox*0.57), this.xSizeBox, this.ySizeBox);
					}
					else image(blockEarthImg, (this.x + i*this.xSizeBox ), yPosition-(this.ySizeBox*0.57), this.xSizeBox, this.ySizeBox);
				}
			}

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
		}

		// image(stepImg, this.x, this.y, this.xSize, this.ySize);
		// fill(0, 50);
  //       rect(this.x, this.y, this.xSize, this.ySize )
	}
}