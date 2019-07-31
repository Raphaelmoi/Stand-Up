// Stone class
class Gems extends Stone {
  constructor(x, imgGem) {
    super(x , x);

    this.position = createVector(x, random(-2000, -10)); // initiate at a random spot
    this.stone = imgGem;
  }
}