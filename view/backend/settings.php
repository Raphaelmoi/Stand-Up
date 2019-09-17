<!-- Display the btns for any change user want to do with his personnal information -->
<?php
$title = 'paramètres';
ob_start();
?>
    <section class="settingView">
        <nav class="settings">
            <ul>
                <a href="index.php?action=backendHome"><li><i class="fas fa-chevron-left fa-lg"></i> Retour accueil</li></a>
                <a href="index.php?action=settingsview"><li>Mon profil</li></a>
                <a href="index.php?action=settingsview&change=pseudo"><li>Changer mon pseudo</li></a>
                <a href="index.php?action=settingsview&change=pass"><li>Changer mon mot de passe </li></a>
                <a href="index.php?action=settingsview&change=mail"><li>Changer mon adresse mail</li></a>
                <a href="index.php?action=settingsview&change=cat"><li>Changer mon chat</li></a>
                <a href="index.php?action=settingsview&change=account"><li>Supprimer mon compte</li></a>
            </ul>
        </nav>
<?php 
    require 'settingsUser.php';//choice of style and sort article
    echo $settingsforms;
?>
</section>  
<?php
$content = ob_get_clean();
require ('templatebackend.php'); 
?>
