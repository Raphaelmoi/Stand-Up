class Draws {
    constructor() {
        this.index = 0; //will allowed to move from one image to another in birdImages
        this.bodyPosition = 0;
        this.isJumping = false;
        this.goingUp = true;
        this.coef = 0;
        this.jumpSize = 0;
    }

    gamePlay(){

        let randomStep = round(random(1,4));
	    let randomObject =  round(random(1, 3));
	    let randomHeightJump = floor(random(10, 25));

        if (baseUnit%20 == 0) {
	       	ennemies.push(new JumperEnnemie(randomHeightJump));
	    }

	    switch (baseUnit){
	    	case 30 : 
				flyingStep.push(new FlyingStep(1.5, 4, 1));
			break;
			case 90 :
				flyingStep.push(new FlyingStep(2.5, 3, 1));
			break;

			case 150 : 
	    		blocStep.push(new BlockStep(0, 4, 2));
	    	break;
	    	case 190 : 
	    		blocStep.push(new BlockStep(0, 10, 4));
	    	break;
	    	case 330:
	    		blocStep.push(new BlockStep(0, 3, 4));
	    	break;
	    	case 400 : 
				flyingStep.push(new FlyingStep(3, 4, 1));
			break;
	    	case 460 : 
				flyingStep.push(new FlyingStep(3, 4, 1));
			break;
			case 510:
				blocStep.push(new BlockStep(0, 1 , 1));
				break;
			case 520:
				blocStep.push(new BlockStep(0, 1 , 2));
				break;
			case 530:
				blocStep.push(new BlockStep(0, 1 , 3));
				break;
			case 540:
				blocStep.push(new BlockStep(0, 4 , 4));
				break;
			case 580:
				blocStep.push(new BlockStep(0, 2 , 3));
				break;
		    case 600:
				blocStep.push(new BlockStep(0, 5 , 2));
				break;
			case 640:
				flyingStep.push(new FlyingStep(3, 4, 1));
			break;			
		    }



    }


}