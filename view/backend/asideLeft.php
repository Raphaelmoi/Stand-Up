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

    <div>
        <?php
        require 'settingsUser.php';//choice of style and sort article
        echo $settingsview;
        ?>
    </div>

        <nav>
            <ul>
                <li><a href="index.php?action=changepseudo">Changer mon pseudo</a></li>
                <li><a href="index.php?action=changepass">Changer mon mot de passe </a></li>
                <li><a href="index.php?action=changemail">Changer mon adresse mail</a></li>
                <li><a href="index.php?action=changecat">Changer mon chat</a></li>
                <li><a href="index.php?action=deleteaccount">Supprimer mon compte</a></li>
            </ul>
        </nav>
    <?php
    }
    $reponse->closeCursor(); // Termine le traitement de la requête
    ?>
</aside>

<?php
$asideLeft = ob_get_clean();
?>