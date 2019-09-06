<?php
ob_start();
?>
<aside class="leftAside" id="leftAsideId">
    <div>
        <img src="<?= $reponse['imageprofil'] ?>">
        <div>
            <h3> <?= $reponse['pseudo'] ?> </h3>
            <?php            
                if ($position == 0):
                    ?>
                    <p> 
                        <i class="fas fa-trophy fa-lg" style="color: gold"></i>
                         Position <b> <?= ($position + 1 )?></b> /<?= $nbrOfPlayers ?>
                    </p>
                    <?php
                elseif ($position == 1):
                    ?>
                    <p> <i class="fas fa-trophy fa-lg" style="color: silver"></i>
                    Position <b><?= ($position + 1 )?> </b> / <?= $nbrOfPlayers ?>
                    </p>
                    <?php
                else:
                    ?>
                    <p>Position : <b> <?= ($position + 1 )?> </b>/
                    <?= $nbrOfPlayers ?>
                    <?php
                endif;            ?>
            <p>Meilleur score du 1er jeu </br>
                <b><?= $reponse['game_one_bs'] ?></b> / <?= $bestScoreGame1['game_one_bs'] ?>
            </p>
            <p>Meilleur score du 2nd jeu </br>
                <b><?= $reponse['game_two_bs'] ?> </b>/ <?= $bestScoreGame2['game_two_bs'] ?>
            </p>
            <p> Joueur de niveau <?= ceil($reponse['game_total']/1000)  ?> </p>
        </div>
    </div>

    <div class="btnsAsideLeft">
        <?php
        if (isset($_GET['action']) && $_GET['action'] == 'playersview'):
            ?>
            <a class="settingsBtn" href="index.php?action=backendHome"><i class="fas fa-chevron-left fa-lg"></i>Retour accueil</a>
            <?php
        else:
            ?>
            <a class="settingsBtn" href="index.php?action=playersview">Voir les autres joueurs</a>
            <?php
        endif;
        ?>
        <a class="settingsBtn" href="index.php?action=settingsview"><i class="fas fa-cog"></i>Paramètres</a>
    </div>
</aside>

<?php
$asideLeft = ob_get_clean();
?>