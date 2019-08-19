<?php
ob_start();

?>
<header id="bigHeader">
        <div class="connect">
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"><span>Connexion </span></i>
                </a>                
            </div>

        </div>

<?php
        if (isset($_GET['action']) && $_GET['action'] == 'signin' ) {?>

            <form class= "connexionBox">
                <h2>Se connecter</h2>
                <input type="name" name="name" placeholder="Pseudo">
                <input type="password" name="pass" placeholder="mot de passe">
            </form>
        <?php     

        }
        elseif (isset($_GET['action']) && $_GET['action'] == 'signup') {
            ?>
         
        <form class="inscriptionBox">
            <h2>S'inscrire</h2>
            <input type="name" name="name" placeholder="Pseudo">
            <input type="password" name="pass" placeholder="mot de passe">
            <input type="password" name="pass" placeholder=" Confirmez mot de passe">
            <input type="mail" name="mail" placeholder="adresse email">
            <div> image </div>
        </form>

        <?php
        }
        else {
            ?>
            <h1> STAND UP !</h1>

        <?php
    }

?>
        <div id="triangleYellow"></div>
        <div id='triangleTranspa'></div>
    </header>


    <header id="smallHeader">
        <div class="connect">
            <div>
                <a href="#">Inscription</a>
            </div>
            <div>
                <a href="#">
                    <i class="fas fa-user"><span>Connexion </span></i>
                </a>                
            </div>
        </div>
        <h1> Stand up !</h1>
    </header>
    <img src="public/img/assto2.png" class="astroImg">      
    <img src="public/img/assto2.png" class="astroImg astroImgTwo"> 

    <?php

$alertBox = ob_get_clean();
?>
