<!-- HOME PAGE -->
<?php
$title = 'page principale';
ob_start();
?>
    <section class="mainSection">
        <article class="premierArticle">
            <h2>Esquivez les météorites et attrapez un maximum de pierres préciseuses</h2>

            <div class="startGame">
                <a href="public/game1/index.php"> 
                    <img src="public/img/sc.jpg">
                    <div class="titleBtn">Commencer la partie</div>
                    <div class="panel"> 
                        <h3> Finger in the noise</h3>
                        <p><span>Controllez l'oiseau grâce à la position de votre nez ! </span></br>    
                    Le but de ce jeu jeu est de récupérer le maximum de pierres précieuses tout en évitant les météorites. L'oiseau suit la position de votre nez via la webcam ! Faites donc bien attention de ne pas être trop en contre-jour et assayez d'atteindre 200 points pour débloquer le deuxième jeux. 
                        </p>
                    </div>
                </a>
            </div>
        </article>
        <article class="deuxiemeArticle">
            <h2>--- Tous les jeux --- </h2>
            <div class="displayGame">
                <div id="contenuOfDisplayGame">
                     <a href="public/game1/index.php">
                        <img src="public/img/sc.jpg">
                        <div class="unlockedGame"> jeux 1</div>
                    </a>
                    <a  href="javascript:;" onclick="alert('Vous devez être connecté pour accéder à cette partie ')">
                        <img src="public/img/G10.jpg">
                        <div class="lockedGame"><i class="fas fa-lock">2</i></div>
                    </a>
                    <a href="javascript:;">
                        <img src="public/img/assto4.png">
                        <div class="lockedGame"><i class="fas fa-lock">3</i></div>
                    </a>
                    <a href="javascript:;">
                        <img src="public/img/G10.jpg">
                        <div class="lockedGame"><i class="fas fa-lock">4</i></div>
                    </a>  
                    <a href="javascript:;">
                        <img src="public/img/assto4.png">
                        <div class="lockedGame"><i class="fas fa-lock">5</i></div>
                    </a>
                    <a href="javascript:;">
                        <img src="public/img/G10.jpg">
                        <div class="lockedGame"><i class="fas fa-lock">6</i></div>
                    </a>  
                </div>
            </div>
            <div id='scrollerbox' class="scrollerbox">
                <button id='scroller'></button>
            </div>
        </article>

        <article>
            <p>Grâce à votre webcam, ces jeux se jouent avec la position de votre nez ou de vos oreilles. Vous devez atteindre 200 points pour accéder au deuxième jeu et être connecter pour jouer aux autres jeux</p>
            <p><a href="index.php?action=signup">Inscrivez-vous</a> et rejoignez la communauté de StandUp! </p>       
        </article>
    </section>

<?php 

$content = ob_get_clean();
require ('template.php'); 
?>
