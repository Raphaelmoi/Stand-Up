class Dragon extends Character{
	constructor(){
		super();
		this.r = 130;
		this.x = width ;
		this.y = height - this.r;
		this.index = 0;
		this.speed = 16;
		this.imgResize = 5;
		// this.directionIsLeft = true;
	}
	move(){
		this.x -= this.speed; 
	}
	show(){
		image(dragonImgBox[this.index],(this.x-this.r*0.5), (this.y-this.r*0.5) + (groundHeight-this.imgResize), this.r, this.r);
	
		// fill(255, 50);
  //       ellipse(this.x, this.y+this.groundHeight, this.r );

	    this.index = (this.index + 1);
	    if (this.index >= dragonImgBox.length) {
	        this.index = 0;
	    }
	}
	actionWhenHit(){
		life -= 30;
		hitSound.play();
	}
}