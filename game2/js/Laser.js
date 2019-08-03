class Laser extends FallingItems
{
	constructor(x) {
	    super(x , x);
	    this.elementSize =  10; // size of the stone
	    this.position = createVector(x, y); // initiate at a random spot
	    this.imgOfTheObject = laserImg;
	  }

	// shoot(bodyPartX, bodyPartY, mouvement){
	// 	let d = this.origin - bodyPartY;
	// 	console.log(d);
	// 		image(this.laserImg, width - bodyPartX -15, bodyPartY - d);

	// }
}
