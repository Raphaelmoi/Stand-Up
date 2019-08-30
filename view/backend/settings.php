<!-- HOME PAGE -->
<?php
$title = 'paramètres';
ob_start();
?>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a href="index.php?action=backendHome">back home</a>

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
    require 'settingsUser.php';//choice of style and sort article


$content = ob_get_clean();
require ('templatebackend.php'); 
?>
