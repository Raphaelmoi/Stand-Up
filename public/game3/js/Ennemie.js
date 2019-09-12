class Ennemie{

	constructor(){
		this.r = 100;
		this.x = width;
		this.y = height - this.r;
	}

	move(){
		this.x -= 10; 
	}
	show(){
		image(stoneImg, this.x, this.y-70, this.r, this.r);
    		fill(255, 50);
    		ellipseMode(CORNER);
	        ellipse(this.x, this.y-70, this.r, this.r )
	}
}