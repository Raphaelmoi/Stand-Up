// Stone class
class Pill extends FallingItems {
  constructor(x, imgGem) {
    super(x , x);
    this.stoneSize =  random(20, 60); // size of the stone

    this.position = createVector(x, random(-2500, -10)); // initiate at a random spot
    this.stone = pillImg;
    this.sante = 10;
  }

  getSante(){
  	return this.sante;
  }
}