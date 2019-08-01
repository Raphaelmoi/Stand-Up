// Stone class
class Gems extends FallingItems {
  constructor(x, imgGem) {
    super(x , x);
    this.stoneSize =  random(30, 60); // size of the stone
    this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
    this.stone = imgGem;
  }
}