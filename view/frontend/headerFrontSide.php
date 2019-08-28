<?php
ob_start();
    if (isset($_GET['action']) && $_GET['action'] == 'signin' ) {
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
                        <i class="fas fa-user"><span>Connexion </span></i>
                    </a>                
                </div>
            </div>


            <form class="connexionBox" action='index.php?action=login' method="post">
                <h2>Se connecter</h2>
                <div>
                    <input type="name" name="name" placeholder="Pseudo">
                    <input type="password" name="pass" placeholder="mot de passe">
                </div>
                <input class="btnFormValidate" type="submit" value="Connexion" >
            </form>
            <div id="triangleYellow" class='topTriangle'></div>
            <div id='triangleTranspa' class='topTriangle'></div>
        </header>
    <?php   
    }
    elseif (isset($_GET['action']) && $_GET['action'] == 'signup') {
    ?>
    <script> getTheCats(); </script>

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
                        <i class="fas fa-user"><span>Connexion </span></i>
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
        }
        elseif (!isset($_GET['action'])) {            
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
                <h1> STAND UP !</h1>
            <div class='topTriangle' id="triangleYellow"></div>
            <div class='topTriangle' id='triangleTranspa'></div>
            </header>
        <?php
    }
?>
    <header id="smallHeader">
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
        <h1> Stand up !</h1>
    </header>
    <img src="public/img/assto2.png" class="astroImg">      
    <img src="public/img/assto2.png" class="astroImg astroImgTwo"> 
<?php
$alertBox = ob_get_clean();
?>
