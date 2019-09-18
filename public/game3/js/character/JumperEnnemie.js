class JumperEnnemie extends Character{
	constructor(heightJump, yOrigin){
		super();
		this.r = 55;
		this.x = width;
		this.y = yOrigin - this.r;
		this.heightJump = - heightJump;
		this.vy = 0;
		this.gravity = 0.9;
		this.isJumping = false;
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
		super.interactionWithDecors();

		this.x -= 14; 
		this.y += this.vy;
		if (this.vy == 0) {
			this.goingUp = false;
		}
		if (this.y  <= 0 ) {
			this.goingUp = false;
			this.vy = 0;
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
			image(imgJumper1,(this.x-this.r*0.5), (this.y-this.r*0.5)+groundHeight, this.r, this.r);
		}
		else if(this.goingUp){
			image(imgJumper2,(this.x-this.r*0.5), (this.y-this.r*0.5)+groundHeight, this.r, this.r);
		} 
	}

	actionWhenHit(){
		life -= 5;
		hitSound.play();
	}
}