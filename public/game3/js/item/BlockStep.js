class BlockStep extends Decors {
 	constructor(step, qttBlock, yBlocks) {
	    super(step, qttBlock, yBlocks);
	    this.step = step;
		this.qttBlock = qttBlock;
		this.yBlocks = yBlocks;
		this.imgStart = cornerleftTopEarthImg;
		this.imgEnd = cornerRightTopEarthImg;
		this.imgCenter = centerTopEarthImg;
	}

	// haveNoLeftCorner(){
	// 	this.haveLeftCorner = false;
	// }
	// haveNoRightCorner(){
	// 	this.haveRightCorner = false;
	// }

}