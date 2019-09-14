class FlyingStep extends Decors {
	constructor(step, qttBlock, yBlocks) {
	    super(step, qttBlock, yBlocks);
		this.step = step;
		this.qttBlock = qttBlock;
		this.yBlocks = yBlocks;
		this.imgStart = stepImgBegin;
		this.imgEnd = stepImgEnd;
		this.imgCenter = stepImg;
	}
}