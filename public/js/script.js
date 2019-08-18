window.onscroll = function() {
        adaptableMenu();
    };
    function adaptableMenu() {
        let astroLeft = document.getElementsByClassName('astroImg')[0];
        let astroRight = document.getElementsByClassName('astroImg')[1];
        let smallHeader = document.getElementById('smallHeader');
        let triangleYellow = document.getElementById('triangleYellow');
        let triangleTranspa = document.getElementById('triangleTranspa');
        let bigHeader = document.getElementById('bigHeader');
        let titleH1 = document.getElementsByTagName('h1')[0];
        let smallTitle = document.getElementsByTagName('h1')[1];
        let Yposition = window.scrollY;

        if (Yposition > 145) {
            document.getElementById('bigHeader').style.display = 'none';
            smallHeader.style.display = 'block';      
            smallHeader.style.height = '40px'; 
            smallTitle.style.fontSize = '30px'; 
            smallTitle.style.lineHeight = '30px';
            astroRight.style.width = '0';
            astroLeft.style.width = '0';
       }
        else if (Yposition <= 145){
            bigHeader.style.display = 'block';
            smallHeader.style.display = 'none';    
            console.log('astroLeft.offsetWidth' + astroLeft.offsetWidth)
            astroLeft.style.width =  200 - Yposition + 'px'; 
            astroRight.style.width = 200 - Yposition + 'px';
            astroLeft.style.opacity = 1 - Yposition/100;

            bigHeader.style.height =  210 -  Yposition;
            triangleTranspa.style.top = 200 -  Yposition;
            triangleYellow.style.top = 200 -  Yposition;

            triangleYellow.style.borderTop = 100 - Yposition /2 + "px solid #fdd835";
            triangleTranspa.style.borderLeft = 1100 + Yposition + "px solid transparent";
            triangleTranspa.style.borderRight = 1100 + Yposition + "px solid transparent";  
            titleH1.style.fontSize = 120 - Yposition/2;
            titleH1.style.lineHeight = (210- Yposition) +'px';

            if (Yposition > 130) {
                triangleTranspa.style.borderTop = 117 - Yposition  + "px solid transparent";
                astroRight.style.top = 10 + 'px';
                titleH1.style.transform = "rotate(-2deg)"; 
            }
            else if(Yposition > 70){
                titleH1.style.transform = "rotate(-4deg)"; 
                astroRight.style.top = 50 - Yposition/3 + 'px';
                triangleTranspa.style.borderTop = 117 - Yposition/2   + "px solid #0288d1";
            }
            else
            {
                triangleTranspa.style.borderTop = 117 - Yposition /2  + "px solid #0288d1";
                astroRight.style.top = 50 - Yposition/2 + 'px';
                titleH1.style.transform = "rotate(-6deg)"; 
            }                             
        }
    }

                
    let scrollerBox = document.getElementById('scrollerbox');
    let btnScroll = document.getElementById('scroller');
    let boxImg = document.getElementById('contenuOfDisplayGame');
    let container = document.getElementsByClassName('displayGame')[0];
    let positionX = 0;
    let scrollerboxWidth = scrollerbox.offsetWidth;

    let positionImg =0;
    let size = 410*4;

    let regleTrois = (container.offsetWidth * scrollerboxWidth) / size;
    btnScroll.style.width = regleTrois;

    let btnScrollWidth = btnScroll.offsetWidth;

    function findPos(el) {
        var x = 0;
        if(el.offsetParent) {
            x = el.offsetLeft;
            while(el = el.offsetParent) {
                x += el.offsetLeft;
            }
        }
        return x;
    }

    // quand on click

    scrollerBox.addEventListener('mousedown',function(e) {
        moveItem(e);
        // tant que click maintenue on recupere mvt
        scrollerBox.addEventListener('mousemove',
         moveItem, false);
    }, false);

    scrollerBox.addEventListener('click', function() {
        scrollerBox.removeEventListener('mousemove', moveItem, false)
    }, false);

    function moveItem(e){
            var ev = e || document.event;
            var pos = findPos(scrollerbox);
            positionX = ev.clientX - pos;
            // console.log(positionX)
            boxImg.style.left = -positionX- btnScrollWidth;
            //if x plus grand que la taille de la barre moins celle du bouton divisé par 2 soit position souris
            if (positionX + btnScrollWidth >= scrollerboxWidth) {
                btnScroll.style.left =  scrollerboxWidth - btnScrollWidth;
                boxImg.style.left = -container.offsetWidth + btnScrollWidth +'px';
            }   //if x plus petit que la taille de la barre moins celle du boutond 
            else if (positionX <= btnScrollWidth/2){
                btnScroll.style.left = 0; 
                boxImg.style.left = 0;
            }
            else{
                btnScroll.style.left = positionX - btnScrollWidth/2;
            }
        }

    window.onkeydown = function(e) {
        let key = e.keyCode;
        if (key == 37) { //Left Arrow
            if (positionX - btnScrollWidth  <= 0) {
                btnScroll.style.left = 0;
                boxImg.style.left = 0;
            }
            else {
                positionX -= btnScrollWidth; 
                positionImg -= btnScrollWidth;
                btnScroll.style.left = positionX +'px';
                boxImg.style.left = - positionX+'px';
            }
        } 

        else if (key == 39) { //Right Arrow

            positionX += btnScrollWidth ; 
            positionImg += btnScrollWidth;

            if (positionX + btnScrollWidth >= scrollerboxWidth) {
                btnScroll.style.left = container.offsetWidth -  btnScrollWidth;
                boxImg.style.left = -container.offsetWidth + btnScrollWidth ;
                positionX -= btnScrollWidth; 
            }  
            else
            {
                btnScroll.style.left = positionX +'px';
                boxImg.style.left =  - positionImg +'px';
            }
        }
    }