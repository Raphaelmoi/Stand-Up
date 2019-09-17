<?php
ob_start();
//dispaly the connected home page content, buttons for accesssing game
?>
<article class="centerArticle">
    <div class="startGame">
        <a href="public/game1/index.php"> 
            <img src="public/img/sc.JPG">
            <div class="titleBtn">Finger in the noise</div>
            <div class="panel"> 
                <h3> Finger in the noise</h3>
                <p>
                    <span>Contrôlez l'oiseau grâce à la position de votre nez ! </span></br>    
                    Le but de ce jeu jeu est de récupérer le maximum de pierres précieuses tout en évitant les météorites. L'oiseau suit la position de votre nez via la webcam ! Faites donc bien attention de ne pas être trop en contre-jour et essayez d'atteindre 200 points pour débloquer le deuxième jeux. 
                </p>
            </div>
        </a>
    </div>

    <div class="startGame">
        <a href="public/game2/index.php"> 
            <img src="public/img/G10.JPG">
            <div class="titleBtn">Finger in the hear</div>
            <div class="panel"> 
                <h3> Finger in the hear</h3>
                <p> Protégez l'astronaute des météorites grâce aux vaisseaux et aidez le à récolter le maximum de pierres précieuses. Les vaisseaux suivent la position de vos oreilles, quant à l'astronaute il suit la position de votre nez mais ne peut pas se détacher du bas.
                </p>
            </div>
        </a>
        <?php
            if ($reponse['game_one_bs'] <= 200):
                ?>
                <div class="lockedGame"><i class="fas fa-lock"></i>
                    <p>Débloquez ce jeu en faisant un score de 200 points sur le premier jeu </p>
                </div>
            <?php
            endif;
        ?>
    </div>            
    <div class="startGame">
        <a href="public/game3/index.php"> 
            <img src="public/img/jump.JPG">
            <div class="titleBtn">En construction... coming soon</div>
                <div class="panel"> 
                <h3> En construction</h3>
                <p>
                    Encore un peu de patience... Votre futur nouveau jeu préféré arrive  !
                </p>
            </div>
        </a>
        <?php
    if ($reponse['authority'] != 1):
    ?>
        <div class="lockedGame"><i class="fas fa-lock"></i></div>
    </div>
<?php endif; ?>
</article>
<?php
$mainContent = ob_get_clean();
?>