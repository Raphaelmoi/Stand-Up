<?php
ob_start();
?>
<aside class="leftAside">
    <?php
    while ($donnees = $reponse->fetch())
    {
    ?>
        <img src="<?= $donnees['imageprofil'] ?>">
        <h3> <?= $donnees['pseudo'] ?> </h3>
        <p>Stand-upper depuis le <?= $donnees['date_inscription'] ?></p>
        <p> Position n° : <?= $donnees['id'] ?> </p>
        
        <nav>
            <ul>
                <li><a href="">Changer mon pseudo</a></li>
                <li><a href="">Changer mon mot de passe </a></li>
                <li><a href="">Changer mon adresse mail</a></li>
                <li><a href="">Changer mon chat</a></li>
                <li><a href="">Supprimer mon compte</a></li>
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