class Draws {
    constructor() {
    }

    gamePlay(){
     //    let randomStep = round(random(1,4));
	    let randomHeightJump = random(5, 35);
        if (baseUnit%20 == 0) {
	       	characteres.push(new JumperEnnemie(randomHeightJump));
	    }
        if (baseUnit%100 == 0) {
				blocStep.push(new BlockStep(-0.5, 30, 1.2));
	    }

	    switch (baseUnit){
	    	case 1:
				blocStep.push(new BlockStep(-0.5, 30, 1.2));
				blocStep[blocStep.length-1].x = 0;

	    	break;
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
				blocStep.push(new BlockStep(0, 20, 2));
				break;
			case 520:
				blocStep.push(new BlockStep(1, 5 , 2));
				break;
			case 530:
				blocStep.push(new BlockStep(2, 3 , 2));
				break;
		    case 620:
				blocStep.push(new BlockStep(1, 6 , 2));
				break;
			case 660:
				flyingStep.push(new FlyingStep(4, 8, 1));
			break;			

			case 770:
				flyingStep.push(new FlyingStep(3, 20, 1));
			break;
			case 810 :
				flyingStep.push(new FlyingStep(5, 12, 1));
			break;
			case 880:
				blocStep.push(new BlockStep(0, 12 , 3));
			break;

			case 1100:
				flyingStep.push(new FlyingStep(1, 20, 1));
			break;
		    }



    }


}