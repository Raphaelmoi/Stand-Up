class SpaceShip{

	constructor(x){
		this.x = 0;
	}

	drawShip(bodyPartX){        
		image(this.imageOfTheShip, width - bodyPartX - 50, this.y);
	}

	drawShipWithLaser(bodyPartX , bodyPartY){
		image(this.imageOfTheShip, width - bodyPartX - 50, bodyPartY);
	}
	drawLaser(bodyPartX , bodyPartY, side){
		mouvement -= 70;
		if (mouvement < -height) {
            mouvement =  bodyPartY;
        }
		image(this.laser, width - bodyPartX + side, mouvement );
	}
}

