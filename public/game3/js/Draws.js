class Draws {
    constructor() {
    }

    gamePlay(){
	    let randomHeightJump = random(5, 35);
	    let randomYorigin = random(0, height);

	    if (Math.random()<= 0.02) {
	       	characteres.push(new JumperEnnemie(randomHeightJump, randomYorigin));
	       	characteres.push(new Coin());
	    }
        if (baseUnit%100 == 0) {
			blocStep.push(new BlockStep(-0.5, 20, 1.2));
	    	characteres.push(new Dragon());
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
	    	case 290:
	    		characteres.push(new Dragon());
	    	break;
	    	case 330:
	    		blocStep.push(new BlockStep(0, 4, 4));
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
				flyingStep.push(new FlyingStep(4, 15, 1));
			break;			
			// case 770:
			// 	flyingStep.push(new FlyingStep(3, 8, 1));
			// break;
			case 810 :
				flyingStep.push(new FlyingStep(3, 12, 1));
			break;
			case 880:
				blocStep.push(new BlockStep(0, 12 , 3));
			break;

			case 1100:
				flyingStep.push(new FlyingStep(1, 20, 1));
			break;
			case 1300:
				flyingStep.push(new FlyingStep(2.7, 4, 1));
			break;
			case 1320:
				flyingStep.push(new FlyingStep(4, 4, 1));
			break;
			case 1340:
				flyingStep.push(new FlyingStep(4, 8, 1));
			break;
			case 1410:
				flyingStep.push(new FlyingStep(3, 3, 1));
			break;
			case 1430:
				flyingStep.push(new FlyingStep(2, 3, 1));
			break;
			case 1450:
				flyingStep.push(new FlyingStep(1, 3, 1));
			break;
		    case 1500:
		    	blocStep.push(new BlockStep(0, 7, 3))
		    break;
		    case 1570:
		    	blocStep.push(new BlockStep(0, 10, 2))
		    break;
		    case 1630:
		    	blocStep.push(new BlockStep(1, 4, 2))
		    break;		    
			case 1700:
				flyingStep.push(new FlyingStep(3, 5, 1));
			break;
		    case 1740 :
		    	blocStep.push(new BlockStep(0, 17, 2))
		    break;
		    case 1810:
				blocStep.push(new BlockStep(1, 10, 2))
		    break;
		    case 1840:
				blocStep.push(new BlockStep(2, 2, 2))
		    break;
		    case 1890:
				blocStep.push(new BlockStep(2, 2, 2))
		    break;


		}

    }


}