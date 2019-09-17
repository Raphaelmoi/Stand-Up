class WaterStep extends Decors {
 	constructor(step, qttBlock, yBlocks) {
	    super(step, qttBlock, yBlocks);
	    this.step = step;
		this.qttBlock = qttBlock;
		this.yBlocks = yBlocks;
		this.imgCenter = waterImg;
		this.imgStart = waterImg;
		this.imgEnd = waterImg;
	}
}