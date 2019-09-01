<?php
ob_start();
?>
<aside class="leftAside">
    <?php
    while ($donnees = $reponse->fetch())
    {
    ?>
    <div>
        <img src="<?= $donnees['imageprofil'] ?>">
        <h3> <?= $donnees['pseudo'] ?> </h3>
        <p>Stand-upper depuis le <?= $donnees['date_inscription_fr'] ?></p>
        <?php
            $position = $userManager -> getUserPosition($donnees['game_total']);

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
        <p> XP : <?= ceil($donnees['game_total']/1000)  ?> </p>

    </div>


    <a class="settingsBtn" href="index.php?action=settingsview"><i class="fas fa-cog"></i>Paramètres</a>


    <?php
    }
    $reponse->closeCursor(); // Termine le traitement de la requête
    ?>
</aside>

<?php
$asideLeft = ob_get_clean();
?>