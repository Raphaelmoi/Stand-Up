// Stone class
class Potion extends FallingItems {
  constructor(x) {
    super(x , x);
    this.stoneSize =  random(20, 60); // size of the stone

    this.position = createVector(x, random(-5000, -2000)); // initiate at a random spot
    this.stone = potionImg;
    this.sante = 100;
  }

  getSante(){
  	return this.sante;
  }
}