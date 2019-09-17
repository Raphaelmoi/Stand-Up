class Coin extends Character{
	constructor(y = 0){
		super();
		this.r = 45;
		this.globalSize = height;
		this.x = width;
		this.y = y;
		this.vy = 0;
		this.gravity = 1;
		this.index = 0;
		this.isJumping = true;
		this.separationFromGround = -60;
		this.groundHeight = 30 + this.separationFromGround;
		this.alternator = 0;
	}

	move(){
		super.interactionWithDecors();
		this.x -= 10; 
		this.y += this.vy;
		this.y = constrain(this.y, 0, height - this.r);
		if (this.isJumping) {
			this.vy += this.gravity;
		}
		//if the charac reach the floor
		if (this.y == height-this.r) { 
			this.isJumping = false;
		 }

		// if (super.hits(characteres[0])) {

		// }
	}
	show(){
	    if (this.index >= 5) {
	        this.index = 0;
	    }
	    //slow down the rotation speed
	    if (this.alternator%5 == 0) {
		    this.index = (this.index + 1);
		    this.alternator = 0;
	    }
	    this.alternator += 1;
		 // fill(255, 50);
   //       ellipse(this.x, this.y, this.r );
		image(coinBoxImg[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5)+this.groundHeight, this.r, this.r);
	}

	actionWhenHit(){
		score += 1;
		console.log('score : '+score);
		catchCoinSound.play();

	}
}
