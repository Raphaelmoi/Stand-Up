<?php
ob_start();
?>
<aside class="leftAside">
    <div>
        <img src="<?= $reponse['imageprofil'] ?>">
        <h3> <?= $reponse['pseudo'] ?> </h3>
        <p>Stand-upper depuis le <?= $reponse['date_inscription_fr'] ?></p>
        <?php
            $position = $userManager -> getUserPosition($reponse['game_total']);

            if ($position == 0) {
                ?>
                <p> <i class="fas fa-trophy fa-lg" style="color: gold"></i> Position n° : <?= ($position + 1 )?> </p>
                <?php
            }
            elseif ($position == 1) {
                ?>
                <p> <i class="fas fa-trophy fa-lg" style="color: silver"></i> Position n° : <?= ($position + 1 )?> </p>
                <?php
            }
            else{
                ?>
                <p>Position n° : <?= ($position + 1 )?> </p>
                <?php
            }
        ?>
        <p>Score jeu 1 :<?= $reponse['game_one_bs'] ?></p>
        <p> XP : <?= ceil($reponse['game_total']/1000)  ?> </p>

    </div>


    <a class="settingsBtn" href="index.php?action=settingsview"><i class="fas fa-cog"></i>Paramètres</a>

</aside>

<?php
$asideLeft = ob_get_clean();
?>