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
        <p> Position n° : <?= $donnees['id'] ?> </p>
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