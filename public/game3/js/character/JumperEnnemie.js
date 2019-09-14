class JumperEnnemie extends Character{
	constructor(heightJump){
		super();
		this.r = 35;
		this.x = width;
		this.y = height - this.r;
		this.heightJump= - heightJump;
		this.vy = 0;
		this.gravity = 0.9;
		this.isJumping = false;
		this.groundHeight = 70;
		this.goingUp = true;
	}
	jump(){
		if (!this.isJumping ) {
			this.vy = this.heightJump;
			this.isJumping = true; 
			this.goingUp = true;
		}
	}
	move(){
		this.x -= 14; 
		this.y += this.vy;
		if (this.vy == 0) {
			this.goingUp = false;
		}
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
		if (!this.goingUp) {
			image(imgJumper1,(this.x-this.r*0.5), (this.y-this.r*0.5), this.r, this.r);
		}
		else if(this.goingUp){
			image(imgJumper2,(this.x-this.r*0.5), (this.y-this.r*0.5), this.r, this.r);
		} 
		 // fill(255, 50);
   //       ellipse(this.x, this.y, this.r );
	}
}