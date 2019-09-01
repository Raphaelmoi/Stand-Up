class LeftEarSpaceShip extends FallingItems {
	constructor(x, randomStone) {
		super(x , x);
		this.elementSize =  random(30, 80)*screenSizeAdaptator; // size of the stone
		this.position = createVector(x, random(-5000, -2000)); // initiate at a random spot
		this.imgOfTheObject = fallingShipL;
	}
}