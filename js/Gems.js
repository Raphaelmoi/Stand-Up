// Stone class
class Gems extends FallingItems {
    constructor(x, imgGem) {
        super(x, x);
        this.elementSize = random(40, 70) * screenSizeAdaptator; // size of the stone
        this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
        this.imgOfTheObject = imgGem;
    }
}