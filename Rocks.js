// Stone class
class Rocks extends FallingItems {
  constructor(x, randomStone) {
    super(x , x);
    this.stoneSize =  random(30, 150); // size of the stone
    this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
    this.stone = randomStone;
  }
}