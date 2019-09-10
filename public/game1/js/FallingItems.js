// Stone class
class FallingItems {
    constructor(x) {
        this.y = random(-2000, -100);
        this.position = createVector(x, this.y); // initiate at a random spot
        this.speed = random(1, 3) + level / 200; // Maximum speed
        this.fall = 0; //falling constant
    }
    //draw stone or else
    display() {
        this.fall += 4;
        let newPosition = this.speed * this.fall;
        push();
        translate(this.position.x, this.position.y + newPosition);
        image(this.imgOfTheObject, -this.elementSize / 3.7, -this.elementSize / 3.7, this.elementSize, this.elementSize);
        pop();
    }
    //check if the falling item has caught the bird
    isOver(width, mX, mY) {
        let newPosition = width - mX;
        let vertical = this.position.y + this.fall * this.speed;

        if (dist(newPosition, mY, this.position.x, vertical) <= this.elementSize*0.9) {
            return true;
        } else {
            return false;
        }
    }
    //return the y position 
    currentYPosition() {
        return this.position.y + this.fall * this.speed;
    }
    //return health or dammage 
    getSante() {
        return this.sante;
    }
}