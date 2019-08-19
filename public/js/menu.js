let astroLeft = document.getElementsByClassName('astroImg')[0];
let astroRight = document.getElementsByClassName('astroImg')[1];
let smallHeader = document.getElementById('smallHeader');
let triangleYellow = document.getElementById('triangleYellow');
let triangleTranspa = document.getElementById('triangleTranspa');
let bigHeader = document.getElementById('bigHeader');
let titleH1 = document.getElementsByTagName('h1')[0];
let smallTitle = document.getElementsByTagName('h1')[1];
let imgAstroWidth = astroLeft.offsetWidth;

window.onscroll = function() {
    adaptableMenu();
};

function adaptableMenu() {
    let Yposition = window.scrollY;

    if (Yposition <= 145) {
        bigHeader.style.display = 'block';
        smallHeader.style.display = 'none';

        astroLeft.style.width = (imgAstroWidth - Yposition / 1.4) + 'px';
        astroRight.style.width = (imgAstroWidth - Yposition / 1.4) + 'px';
        astroLeft.style.opacity = 1 - Yposition / 1.4 / 100;

        bigHeader.style.height = (200 - Yposition) + 'px';
        triangleTranspa.style.top = (200 - Yposition) + 'px';
        triangleYellow.style.top = (200 - Yposition) + 'px';

        triangleYellow.style.borderTop = 100 - Yposition + "px solid #fdd835"; //#fdd835
        triangleTranspa.style.borderLeft = 1100 + Yposition + "px solid transparent"; //transparent
        triangleTranspa.style.borderRight = 1100 + Yposition + "px solid transparent";
        titleH1.style.fontSize = (120 - Yposition / 2) + 'px';
        titleH1.style.lineHeight = (210 - Yposition) + 'px';

        triangleTranspa.style.borderTop = 117 - Yposition + "px solid #0288d1"; //#0288d1
        astroRight.style.top = (50 - Yposition / 2) + 'px';
        titleH1.style.transform = "rotate(-6deg)";

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
        bigHeader.style.display = 'none';
        smallHeader.style.display = 'block';
        smallHeader.style.height = '40px';
        smallTitle.style.fontSize = '30px';
        smallTitle.style.lineHeight = '30px';
        astroRight.style.width = '0';
        astroLeft.style.width = '0';
    }
}