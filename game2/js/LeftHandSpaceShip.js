class LeftHandSpaceShip extends SpaceShip{
	constructor(x){
		super(x, x);
		this.elementSize =  100*screenSizeAdaptator; // size of the stone
		this.imageOfTheShip = spaceShipLeftHand;
		this.laser = laserLeftImg;
	}
}