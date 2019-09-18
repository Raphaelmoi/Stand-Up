class NoseItem extends Character{
	constructor(){
		super();
		this.r = 150;
		this.globalSize = height;
		this.x = this.r;
		this.y = (this.globalSize - this.r);
		this.vy = 0;
		this.gravity = 1;
		this.index = 0;
		this.isJumping = false;
	}

	jumpWithNose(){
		if (!this.isJumping ) {
			this.vy = -25;
			this.isJumping = true; 
		}
	}
	move(){
		super.interactionWithDecors();

		this.y += this.vy;
		this.y = constrain(this.y, 0, height - this.r);
		if (this.isJumping) {
			this.vy += this.gravity;
		}
		//if the charac reach the floor
		if (this.y == height-this.r) { 
			this.isJumping = false;
		 }
	}
	show(){
		if (!this.isJumping) {
	        if (this.index >= 31) {
	            this.index = 0;
	        }
			image(runImg[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5)+groundHeight, this.r, this.r);
	        this.index = (this.index + 1);
		}
		else if(this.isJumping){
			image(runImg[40],(this.x-this.r*0.5), (this.y-this.r*0.5)+groundHeight, this.r, this.r);
		}
		// fill(255, 50);
  //       ellipse(this.x, this.y+this.groundHeight, this.r );
	}
}
