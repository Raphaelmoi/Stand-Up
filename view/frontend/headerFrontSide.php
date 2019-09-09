<?php
ob_start();
if (isset($_GET['action']) && $_GET['action']!= 'signup'):
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
        <p>Nous vous avons envoyé un email à <b><?php echo $_GET['email'] ?></b></p>
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

elseif (isset($_GET['action']) && $_GET['action'] == 'signup'):
?>
    <script>
        if (window.innerWidth >= 1000) { CatApi.getTheCats(6); }
        else if (window.innerWidth >= 600) { CatApi.getTheCats(5); }
        else if (window.innerWidth >= 400) { CatApi.getTheCats(3); }
        else{ CatApi.getTheCats(2);}
    </script>

    <header id="headerConnexion">
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
        <form class="inscriptionBox" action='index.php?action=inscription' method="post">
            <h2>S'inscrire</h2>
            <input type="name" name="name" placeholder="Pseudo">
            <input type="mail" name="mail" placeholder="adresse email">
            <input type="password" name="pass" placeholder="mot de passe">
            <input type="password" name="passTwo" placeholder=" Confirmez mot de passe">
            <div id="boxImg"></div>
            <input type="hidden" name="imageUrl" id="hiddenInputInscription" value="">
            <input class="btnFormValidate" type="submit" name="submit" value="Inscription">
        </form>
        <div id="triangleYellow" class="connectTY"></div>
        <div id='triangleTranspa' class='connectTT'></div>
    </header>
<?php

elseif (!isset($_GET['action'])):
?>
    <header id="bigHeader">
        <div class="connect">
            <?php
            if (!empty($_SESSION['pseudo'])) {
            ?>
                <div id='backBtn'>
                    <a href="index.php?action=backendHome">profil</a>
                </div>
            <?php
            }
            ?>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
        </div>
        <h1> STAND UP !</h1>
        <div class='topTriangle' id="triangleYellow"></div>
        <div class='topTriangle' id='triangleTranspa'></div>
    </header>

    <header id="smallHeader">
        <div class="connect">
            <?php
            if (!empty($_SESSION['pseudo'])):
                ?>
                    <div id='backBtn'>
                        <a href="index.php?action=backendHome">profil</a>
                    </div>
                <?php
                endif;
                ?>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
        </div>
        <h1 id="smallHeadertitle"> Stand up !</h1>
    </header>
    <img src="public/img/assto2.png" class="astroImg">      
    <img src="public/img/assto2.png" class="astroImg astroImgTwo"> 
    <img src="public/img/assto2.png" class="astroSmallHeader">      
    <?php
endif;
$alertBox = ob_get_clean();
?>
