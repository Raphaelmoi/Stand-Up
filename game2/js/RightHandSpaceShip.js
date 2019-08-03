class RightHandSpaceShip extends SpaceShip{
	constructor(x){
		super(x, x);
		this.elementSize =  100*screenSizeAdaptator; // size of the stone
		this.imageOfTheShip = spaceShipRightHand;
		this.laser = laserRightImg;
	}
}