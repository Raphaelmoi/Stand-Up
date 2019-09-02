<?php
ob_start();
?>
<aside class="leftAside">
    <div>
        <img src="<?= $reponse['imageprofil'] ?>">
        <h3> <?= $reponse['pseudo'] ?> </h3>
<!--         <p>Inscrit depuis le </br><?= $reponse['date_inscription_fr'] ?></p>
 -->        <?php
            $position = $userManager -> getUserPosition($reponse['game_total']);
            $nbrOfPlayers = $userManager -> getNumberOfUsers();

            $bestScoreGame1 = $userManager -> getBestScoreGOne();
            $bestScoreGame2 = $userManager -> getBestScoreGTwo();

            if ($position == 0) {
                ?>
                <p> 
                    <i class="fas fa-trophy fa-lg" style="color: gold"></i>
                     Position <b> <?= ($position + 1 )?></b> /<?= $nbrOfPlayers ?>
                </p>
                <?php
            }
            elseif ($position == 1) {
                ?>
                <p> <i class="fas fa-trophy fa-lg" style="color: silver"></i>
                Position <b><?= ($position + 1 )?> </b> / <?= $nbrOfPlayers ?>
                </p>
                <?php
            }
            else{
                ?>
                <p>Position : <b> <?= ($position + 1 )?> </b>/
                <?= $nbrOfPlayers ?>
                <?php
            }
        ?>
        <p>Meilleur score du 1er jeu </br>
            <b><?= $reponse['game_one_bs'] ?></b> / <?= $bestScoreGame1['game_one_bs'] ?>
        </p>
        <p>Meilleur score du 2nd jeu </br>
            <b><?= $reponse['game_two_bs'] ?> </b>/ <?= $bestScoreGame2['game_two_bs'] ?>
        </p>

        <p> Joueur de niveau <?= ceil($reponse['game_total']/1000)  ?> </p>

    </div>
    <div>
        <a class="settingsBtn" href="index.php?action=playersview">Voir les autres joueurs</a>
        <a class="settingsBtn" href="index.php?action=settingsview"><i class="fas fa-cog"></i>Paramètres</a>
    </div>


</aside>

<?php
$asideLeft = ob_get_clean();
?>