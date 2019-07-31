// Stone class
class Stone {
  constructor(x) {
    this.position = createVector(x, random(-2000, -10)); // initiate at a random spot

    this.stoneSize =  random(30, 100); // size of the stone
    this.maxspeed = random(1, 3); // Maximum speed
    // console.log('position.x' + this.position.x + 'position.y' + this.position.y);
    this.explosion;
    this.stone = 0;
    this.fall = 4;
  }

  //draw predator
  display() {
    this.fall += 4;
    let newPosition = this.maxspeed * this.fall;
    //console.log('position x : ' + this.position.x +'this.direction : '+ this.direction + 'newX : '+ newX ); 
    push();
    translate(this.position.x, this.position.y + newPosition);
    //fill(255, 0,0);
    //ellipse(20,20,this.stoneSize,this.stoneSize)
    image(this.stone, -this.stoneSize/3.7 , -this.stoneSize/3.7 , this.stoneSize, this.stoneSize);

    pop();
  }

  // keep all fish in the scene by having them enter the frame from the opposite side they leave the frame 
  borders() {
    if (this.position.x < -this.stoneSize) this.position.x = width + this.stoneSize;
    if (this.position.y < -this.stoneSize) this.position.y = height + this.stoneSize;
    if (this.position.x > width + this.stoneSize) this.position.x = -this.stoneSize;
    if (this.position.y > height + this.stoneSize) this.position.y = -this.stoneSize;
  }

  //check if the predator has caught the player
  isOver(width, mX, mY) {
    let newPosition = width - mX;
    let vertical = this.position.y + this.fall * this.maxspeed;

    if (dist(newPosition, mY, this.position.x, vertical) <= this.stoneSize) {
      return true;
    } else {
      return false;
    }
  }


}