/*sprite arguments :
  img to sprite -> the img to sprite, have to be declare and load in the preload function
  box -> empty array to store each img, have to be declare in sketch
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
}
