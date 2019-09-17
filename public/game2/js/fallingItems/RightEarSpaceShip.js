class RightEarSpaceShip extends FallingItems {
	constructor(x, randomStone) {
	    super(x , x);
	    this.elementSize =  random(30, 80)*screenSizeAdaptator; // size of the stone
	    this.position = createVector(x, random(-3500, -2000)); // initiate at a random spot
	    this.imgOfTheObject = fallingShipR;
	}
}