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
                    <h3>Finger in the noise</h3>
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
                    <div class="titleBtn unlockedGame"> Finger in the noise,</br> un jeux qui se joue exclusivement au pif !</div>
                </a>
                <?php
                    if (isset($_SESSION['score']) && $_SESSION['score'] >= 200):
                        ?>
                    <a href="public/game2/index.php">
                    <img src="public/img/G10.jpg">
                    <div class="titleBtn unlockedGame"></i>Finger in the hear</br>Aidez l'astronaute, utilisez vos oreilles!
                    </div>
                </a>
                <?php
                    else:
                ?>
                <a href="javascript:;" onclick="alert('Vous devez faire 200 points au premier jeu pour accéder à la partie')">
                    <img src="public/img/G10.jpg">
                    <div class="lockedGame"><i class="fas fa-lock"></i>Finger in the hear</br>Aidez l'astronaute, utilisez vos oreilles!</div>
                </a>
            <?php endif; ?>
                <a href="javascript:;">
                    <img src="public/img/assto4.png">
                    <div class="lockedGame"><i class="fas fa-lock"></i>En construction</div>
                </a>
            </div>
        </div>
    </article>

    <article>
        <div class="descriptionHomePage">
            <p> Ces jeux fonctionnent grâce à la reconnaissance faciale. En activant votre webcam, 
                la position de votre nez sera détecté et vous allez pouvoir controller votre personnage  avec parfois votre nez, parfois vos oreilles!
                <b>Vous devez atteindre 200 points pour accéder au deuxième jeu</b> et être connecter pour jouer aux autres jeux</p>
            <div>
                <a href="index.php?action=signup">Inscrivez-vous</a> et rejoignez la communauté de StandUp! 
            </div>
        </div>
    </article>
</section>

<?php 
$content = ob_get_clean();
require ('template.php'); 
?>
