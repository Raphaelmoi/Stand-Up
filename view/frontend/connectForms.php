<?php
//display forms depending of the  'action' received 
//signin -> to connect
//forgot pass -> mail form
//pending -> say to the user we sent him a mail
//resetpass -> form with the received token 
ob_start();
?>        
    <header id="connectHeader">
        <div class="connect">
            <div id='backBtn'>
                <a href="index.php">retour</a>
            </div>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
        </div>

    <?php
    if ($_GET['action'] == 'signin'):
    ?>
        <form class="connexionBox" action='index.php?action=login' method="post">
            <h2>Se connecter</h2>
            <div>
                <input type="name" name="name" placeholder="Pseudo" required>
                <input type="password" name="pass" placeholder="mot de passe" required>
            </div>
            <a href="index.php?action=forgotpass">Mot de passe oublié ?</a>
            <input class="btnFormValidate" type="submit" value="Connexion" >
        </form>
    <?php

    elseif ($_GET['action'] == 'forgotpass'):
    ?>
        <form class="connexionBox" action="index.php?action=sendNewPass" method="post">
            <h2>Réinitialiser mot de passe </h2>
               <input type="email" name="email" placeholder="Votre adresse mail" required>
                <input class="btnFormValidate" type="submit" name="reset-password" value="Réinitialiser mot de passe"> 
        </form>
    <?php

    elseif ($_GET['action'] == 'pending'):
    ?>
    <form class="connexionBox">
    </br>
        <p>Nous vous avons envoyé un email à <b><?= $_GET['email'] ?></b></p>
        <p>Connectez vous a votre boite email et cliquez sur le lien que l'on vous a envoyé pour récupérer votre mot de passe</p>
    </form>
    <?php

    elseif ($_GET['action'] == 'resetpass'):
    ?>
        <form class="connexionBox" action="index.php?action=updatepw" method="post">
            <h2>New password</h2>
            <div>
                <input type="password" name="pass" placeholder="Nouveau mot de passe">
                <input type="password" name="confirmpass" placeholder="Confirmez mot de passe">
                <input type="hidden" name="token" value="<?= $_GET['token']?>">
            </div>
            <input class="btnFormValidate" type="submit" name="submit" value="Changer mot de passe">
        </form>
    <?php
    endif;
    ?>
        <div id="triangleYellow" class='topTriangle'></div>
        <div id='triangleTranspa' class='topTriangle'></div>            
    </header>
<?php

$forms = ob_get_clean();
?>
