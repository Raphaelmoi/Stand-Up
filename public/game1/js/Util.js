/*sprite arguments :
  img to sprite -> the img to sprite, have to be declare and load in the preload function
  box -> empty array to store each img
  widthImg -> the width of each frame, numeric value put directly when call the function
  heightImg -> the height of each frame, idem
  column -> number of column of the imgtosprite
  nbrFrame-> total of frame
*/
class Util{
    spriteImage(imgToSprite, box, widthImg, heightImg, column, nbrFrame){
        let x = 0;
        let y = 0;
        for (let i = 1; i <= nbrFrame; i++) {
            let img = imgToSprite.get(x, y, widthImg, heightImg);
            box.push(img);
            x += widthImg;
            if (i % column == 0) {
                y += heightImg;
              x = 0;
          }
        }
    }
    newStone(qtt){
        for (let i = 0; i < qtt; i++) {
            let choice = boxImgStones[Math.floor(Math.random()*boxImgStones.length)];
            stones.push(new Rocks(random(0, width), choice));    
        }
    }
    newGem(qtt)
    {
        for (let i = 0; i < qtt; i++) { 
            let item = boxImgGems[Math.floor(Math.random()*boxImgGems.length)];
            boxGems.push(new Gems(random(0, width), item));    
        }
    }
    newPill(qtt){
        for (let i = 0; i < qtt; i++) { 
            pills.push(new Pill(random(0, width)));    
        }
    }
    newPotion(qtt){
        for (let i = 0; i < qtt; i++) { 
            potions.push(new Potion(random(0, width))); 
        }
    }
}
