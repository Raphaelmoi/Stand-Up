<!-- HOME PAGE -->
<?php
$title = 'page principale';
ob_start();
?>
    <section >
        <article class="premierArticle">
            <h2>Esquivez les météorites et attrapez un maximum de pierres préciseuses</h2>

            <div class="startGame">
                <a href="public/game1/index.html"> 
                    <img src="public/img/sc.jpg">
                    <div class="titleBtn">Commencer la partie</div>
                    <div class="panel"> 
                        <h3> Finger in the noise</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </a>
            </div>
        </article>
        <article class="deuxiemeArticle">
            <h2>--- Tous les jeux --- </h2>
            <div class="displayGame">
                <div id="contenuOfDisplayGame">
                     <a href="public/game1/index.html">
                        <img src="public/img/sc.jpg">
                        <div class="unlockedGame"> jeux 1</div>
                    </a>
                    <a href="public/game2/index.html">
                        <img src="public/img/G10.jpg">
                        <div class="lockedGame"><i class="fas fa-lock">2</i></div>
                    </a>
                    <a href="">
                        <img src="public/img/assto4.png">
                        <div class="lockedGame"><i class="fas fa-lock">3</i></div>
                    </a>
                    <a href="">
                        <img src="public/img/G10.jpg">
                        <div class="lockedGame"><i class="fas fa-lock">4</i></div>
                    </a>  
                    <a href="">
                        <img src="public/img/assto4.png">
                        <div class="lockedGame"><i class="fas fa-lock">5</i></div>
                    </a>
                    <a href="">
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
