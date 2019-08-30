<!-- HOME PAGE -->
<?php
$title = 'paramètres';
ob_start();
?>
    <section class="settingView">  

        <nav class="settings">
            <ul>
                <li><a href="index.php?action=backendHome">back home</a></li>
                <li><a href="index.php?action=settingsview&change=pseudo">Changer mon pseudo</a></li>
                <li><a href="index.php?action=settingsview&change=pass">Changer mon mot de passe </a></li>
                <li><a href="index.php?action=settingsview&change=mail">Changer mon adresse mail</a></li>
                <li><a href="index.php?action=settingsview&change=cat">Changer mon chat</a></li>
                <li><a href="index.php?action=settingsview&change=account">Supprimer mon compte</a></li>
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
