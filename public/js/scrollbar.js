let scrollerBox = document.getElementById('scrollerbox');
let btnScroll = document.getElementById('scroller');
let boxImg = document.getElementById('contenuOfDisplayGame');
let container = document.getElementsByClassName('displayGame')[0];

let positionX = 0;
let lastPosX = 0;
let scrollerboxWidth = scrollerbox.offsetWidth;

let positionImg = 0;
let size = 400 * 6;

let regleTrois = (container.offsetWidth * scrollerboxWidth) / size;
btnScroll.style.width = regleTrois + 'px';//regleTrois;

let btnScrollWidth = btnScroll.offsetWidth;

function findPos(el) {
    var x = 0;
    if (el.offsetParent) {
        x = el.offsetLeft;
        while (el = el.offsetParent) {
            x += el.offsetLeft;
        }
    }
    return x;
}
// quand on click
scrollerBox.addEventListener('mousedown', function(e) {
    moveItem(e);
    // tant que click maintenue on recupere mvt
    scrollerBox.addEventListener('mousemove',
        moveItem, false);
}, false);

scrollerBox.addEventListener('click', function() {

    scrollerBox.removeEventListener('mousemove', moveItem, false)
}, false);

function moveItem(e) {
    lastPosX = positionX;

    var ev = e || document.event;
    var pos = findPos(scrollerbox);
    positionX = ev.clientX - pos;
    boxImg.style.left = (-positionX - btnScrollWidth) + 'px';

    // console.log(positionX);


    let test = (size/ scrollerboxWidth )* positionX;

    //if x plus petit que la taille de la barre moins celle du boutond 
    if (positionX  - btnScrollWidth/2 < 0) {
        btnScroll.style.left = 0;
        boxImg.style.left = 0;
        positionX = 0;
        positionImg = 0;
    }

    else if (( positionX -  btnScrollWidth/2) >= 0 && (positionX + btnScrollWidth/2) <= scrollerboxWidth) {
        //si on va vers la gauche
        if (positionX > lastPosX ) {
            positionImg = positionX;
            positionX -= btnScrollWidth/2;
            btnScroll.style.left = positionX + 'px';
            boxImg.style.left = -test + 'px';
        }
        else if (positionX < lastPosX ){
            console.log('la')
            positionImg = positionX;
            positionX -= btnScrollWidth/2;
            btnScroll.style.left = positionX + 'px';
            boxImg.style.left = -test + 'px';
        }
    }
    //if x plus grand que la taille de la barre moins celle du bouton divisé par 2 soit position souris
    else if ((positionX + btnScrollWidth/2) > scrollerboxWidth) {
        btnScroll.style.left = (scrollerboxWidth - btnScrollWidth) + 'px';
        boxImg.style.left = - (size - scrollerboxWidth ) + 'px';
        positionX = scrollerboxWidth;
        positionImg = (size - scrollerboxWidth);

    } 
}

window.onkeydown = function(e) {
    let key = e.keyCode;
    if (key == 37) { //Left Arrow
        if (positionX - btnScrollWidth < 0) {
            btnScroll.style.left = 0;
            boxImg.style.left = 0;
            positionX = 0;
            positionImg = 0;
        } 
        else {
            positionX -= btnScrollWidth;
            positionImg -= btnScrollWidth;
            btnScroll.style.left = (positionX/2 )+ 'px';
            boxImg.style.left = -positionImg + 'px';
        }
    } else if (key == 39) { //Right Arrow

        if (positionX + 2*btnScrollWidth > scrollerboxWidth) {
            btnScroll.style.left = (scrollerboxWidth - btnScrollWidth) + 'px';
            boxImg.style.left = - (size - scrollerboxWidth ) + 'px';

            positionX = scrollerboxWidth;
            positionImg = (size - scrollerboxWidth);
        } 
        else {
            positionX += btnScrollWidth/2;
            positionImg += btnScrollWidth;
            btnScroll.style.left = positionX + 'px';
            boxImg.style.left = -positionImg + 'px';
        }
    }
}