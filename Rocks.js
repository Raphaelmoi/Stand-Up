// Stone class
class Rocks extends Stone {
  constructor(x) {
    super(x , x);
    this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
    this.stone = imgStone;
  }
}