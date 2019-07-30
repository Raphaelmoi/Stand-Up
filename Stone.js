// Stone class

/*determiner par une position aleatoire x 
y = 0 au debut
peut avoir une vitesse plus ou moins rapide
si contact avec oiseau mort de l'oiseau
une taille plus ou moins grande
*/

class Stone {
  constructor(x) {
    this.position = createVector(x, random(-2000, -10)); // initiate at a random spot
    //this.position = createVector(x, random(0, height)); // initiate at a random spot
    this.stoneSize =  random(20, 100); // size of the stone
    this.maxspeed = random(1, 3); // Maximum speed
    // console.log('position.x' + this.position.x + 'position.y' + this.position.y);
  }



  //draw predator
  display(y) {
    let newPosition = this.maxspeed * y;
    //console.log('position x : ' + this.position.x +'this.direction : '+ this.direction + 'newX : '+ newX );
    // fill(127, 0, 0);
    // stroke(200);
    // strokeWeight(2);
    push();
    translate(this.position.x, this.position.y + newPosition);
    image(imgStone, this.stoneSize/2 , this.stoneSize/2 , this.stoneSize, this.stoneSize);

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
  isOver(width, mX, mY,  y) {
    let newPosition = width - mX;
    let vertical = this.position.y + y*this.maxspeed;
    // console.log('nez' + mY);
    // console.log('caillou ' + vertical);

    // console.log("mX :" + mX );
    //console.log("mY :" + mY + ", this.position.y : " + this.position.y);

    if (dist(newPosition, mY, this.position.x, vertical) <= this.stoneSize) {
      return true;
    } else {
      return false;
    }
  }
}