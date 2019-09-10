// Stone class
class Pill extends FallingItems {
 	constructor(x) {
    	super(x , x);
	    this.elementSize =  random(30, 60)*screenSizeAdaptator; // size of the stone
	    this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
	    this.imgOfTheObject = pillImg;
	    this.sante = 10;
 	}
}