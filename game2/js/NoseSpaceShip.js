class NoseSpaceShip extends SpaceShip{
	constructor(x){
		super(x, x);
		this.elementSize =  100*screenSizeAdaptator; // size of the stone
		this.y = height - 180;
		//this.imageOfTheShip = astronaute;
	}
}