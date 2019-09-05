let astroLeft = document.getElementsByClassName('astroImg')[0];
let astroRight = document.getElementsByClassName('astroImg')[1];
let smallHeader = document.getElementById('smallHeader');
let triangleYellow = document.getElementById('triangleYellow');
let triangleTranspa = document.getElementById('triangleTranspa');
let headerActual = document.getElementsByTagName('header')[0];
let bigHeader = document.getElementById('bigHeader');
let titleH1 = document.getElementsByTagName('h1')[0];
let smallTitle = document.getElementsByTagName('h1')[1];
let imgAstroWidth  = 0;
let headerSize = 0;

window.onscroll = function() {
    if (bigHeader != null) {
        adaptableMenu();
    }
};

function adaptableMenu() {
    if (window.innerWidth > 700) {
        let Yposition = window.scrollY;

        while (headerSize <1) {
            imgAstroWidth = astroLeft.offsetWidth;

            headerSize = bigHeader.offsetHeight;

            bigHeader.style.height = headerSize +'px';
            triangleTranspa.style.top = headerSize+'px';
            triangleYellow.style.top = headerSize+'px';
            headerSize++;
        }

        if (Yposition <= 145) {
            bigHeader.style.display = 'block';
            smallHeader.style.display = 'none';

            astroLeft.style.width = (imgAstroWidth - Yposition / 1.4) + 'px';
            astroRight.style.width = (imgAstroWidth - Yposition / 1.4) + 'px';
            astroLeft.style.opacity = 1 - Yposition / 1.4 / 100;

            bigHeader.style.height = (headerSize - Yposition) + 'px';
            triangleTranspa.style.top = (headerSize - Yposition) + 'px';
            triangleYellow.style.top = (headerSize - Yposition) + 'px';

            triangleYellow.style.borderTop = 100 - Yposition + "px solid #fdd835"; //#fdd835
            triangleTranspa.style.borderLeft = 1100 + Yposition + "px solid transparent"; //transparent
            triangleTranspa.style.borderRight = 1100 + Yposition + "px solid transparent";
            titleH1.style.fontSize = (120 - Yposition / 2) + 'px';
            titleH1.style.lineHeight = (headerSize - Yposition) + 'px';

            triangleTranspa.style.borderTop = 117 - Yposition + "px solid #0288d1"; //#0288d1
            astroRight.style.top = (50 - Yposition / 2) + 'px';
            titleH1.style.transform = "rotate(-6deg)";
            document.getElementsByClassName('astroSmallHeader')[0].style.opacity = "0";


            if (Yposition > 130) {
                triangleTranspa.style.borderTop = 117 - Yposition + "px solid transparent";
                astroRight.style.top = 10 + 'px';
                titleH1.style.transform = "rotate(-2deg)";

            } else if (Yposition > 70) {
                titleH1.style.transform = "rotate(-4deg)";
                astroRight.style.top = 50 - Yposition / 2 + 'px';
            } else {
                triangleTranspa.style.borderTop = 117 - Yposition + "px solid #0288d1";
                astroRight.style.top = 50 - Yposition / 2 + 'px';
                titleH1.style.transform = "rotate(-6deg)";
            }
        } else if (Yposition > 145) {
            showSmallMenu();
        }
    }
}

function showSmallMenu(){
        bigHeader.style.display = 'none';     
        smallHeader.style.display = 'block';
        smallHeader.style.height = '40px';
        smallTitle.style.fontSize = '30px';
        smallTitle.style.lineHeight = '30px';
        astroRight.style.width = '0';
        astroLeft.style.width = '0';
        document.getElementsByClassName('astroSmallHeader')[0].style.opacity = "1";
}