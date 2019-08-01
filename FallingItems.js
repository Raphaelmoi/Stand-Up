// Stone class
class FallingItems {
  constructor(x) {
    this.y =  random(-2000, -100);
    this.position = createVector(x, this.y); // initiate at a random spot
    this.speed = random(1, 3); // Maximum speed
    this.fall = 4;
  }

  //draw predator
  display() {
    this.fall += 4;
    let newPosition = this.speed * this.fall;
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
    let vertical = this.position.y + this.fall * this.speed;

    if (dist(newPosition, mY, this.position.x, vertical) <= this.stoneSize) {
      return true;
    } else {
      return false;
    }
  }


}