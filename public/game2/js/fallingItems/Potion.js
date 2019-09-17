// Stone class
class Potion extends FallingItems {
	constructor(x) {
	    super(x , x);
	    this.elementSize =  random(40, 60)*screenSizeAdaptator; // size of the stone
	    this.position = createVector(x, random(-4000, -2000)); // initiate at a random spot
	    this.imgOfTheObject = potionImg;
	    this.sante = 50;
	}
}