window.onscroll = function() {
        adaptableMenu();
    };
    function adaptableMenu() {
        let astroLeft = document.getElementsByClassName('astroImg')[0];
        let astroRight = document.getElementsByClassName('astroImg')[1];
        let smallTitle = document.getElementsByTagName('h1')[1];
        let smallHeader = document.getElementById('smallHeader');

        if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
            document.getElementById('bigHeader').style.display = 'none';
            smallHeader.style.display = 'block';      
            smallHeader.style.height = '40px'; 
            smallTitle.style.fontSize = '30px'; 
            smallTitle.style.lineHeight = '30px';
            astroRight.style.width = '0';
       }
        else if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
            document.getElementById('bigHeader').style.display = 'none';
            smallHeader.style.display = 'block';
            smallHeader.style.height = '100px';     
            smallTitle.style.fontSize = '50px';   
            smallTitle.style.lineHeight = '100px';
            astroLeft.style.width = '0';
            astroRight.style.width = '100px';
            astroRight.style.top = '10px';
        }
        else{
            document.getElementById('bigHeader').style.display = 'block';
            smallHeader.style.display = 'none';    
            astroLeft.style.width = '200px'; 
            astroRight.style.width = '200px';
            astroRight.style.top = '50px';
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