class Draws {
    constructor() {
    }

    drawHealthAndText() {
        //health bar
        noStroke();
        fill(255);
        textSize(20*screenSizeAdaptator);
        textAlign(LEFT);
        
        text("Santé", 18*screenSizeAdaptator, 32*screenSizeAdaptator);
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(100*screenSizeAdaptator, 12*screenSizeAdaptator, 250*screenSizeAdaptator, 22*screenSizeAdaptator);
        noStroke();
        fill(81, 221, 37);
        rect(101*screenSizeAdaptator, 13*screenSizeAdaptator, map(life, 0, 100, 0, 248*screenSizeAdaptator), 20*screenSizeAdaptator);
        noStroke();        

        //Points
        push();
        textAlign(RIGHT);
        fill(255);
        text(" Score : ", width - 120, 30);
        textSize(24);
        text(score, width - 50, 30);
        pop();
    }

    drawBackground(){
        image(imgBackground, posBck1, 0, width, height);
        image(imgBackground, posBck2, 0, width, height);

        posBck1 += scrollSpeed;
        posBck2 += scrollSpeed;
        if (posBck1 >= width){
          posBck1 = -width;
        }
        if (posBck2 >= width){
          posBck2 = -width;
        }
    }

    eraseOutItem(){
        let decors = [flyingStep, blocStep];

        for (var h = decors.length - 1; h >= 0; h--) {
            for (var i = 0; i < decors[h].length; i++) {
                decors[h][i].move();
                decors[h][i].show();
                if ( decors[h][i].x+decors[h][i].xSize < 0) {
                    decors[h].splice(i, 1);
                }
            }
        }
    }

    animateAndDestroyCharacteres(){
        for (let c of characteres){
            //check the existence of the jump() method before calling it
            if (typeof c.jump === "function") { 
                c.jump();
            }
            c.move();
            c.show();
        }
        //destroy charactere when out or when hits by the player 
        let k = characteres.length;
        while (k--) {
            if (characteres[k].x < 0) {
                characteres.splice(k, 1);
            }     
            if (characteres[k] != undefined) { 
                if (k > 0 && characteres[k].hits(characteres[0])) {
                    characteres[k].actionWhenHit();
                    characteres.splice(k, 1);
                }  
            }
        }
    }


}