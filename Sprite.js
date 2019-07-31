function sprite(imgToSprite, box, widthImg, heightImg, column){
    let x = 0;
    let y = 0;
    for (let i = 1; i <= totalImages; i++) {

        let img = imgToSprite.get(x, y, widthImg, heightImg);
        box.push(img);

        x += widthImg;
        if (i % column == 0) {
            y += heightImg;
            x = 0;
        }
      }
}