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
                        <i class="fas fa-user"></i>Connexion
                    </a>                
                </div>
            </div>

            <form class="connexionBox" action='index.php?action=login' method="post">
                <h2>Se connecter</h2>
                <div>
                    <input type="name" name="name" placeholder="Pseudo" required>
                    <input type="password" name="pass" placeholder="mot de passe" required>
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
    <script>
        if (window.innerWidth >= 1000) {
            getTheCats(6);             
        }
        else if (window.innerWidth >= 600) {
            getTheCats(5);             
        }
        else if (window.innerWidth >= 400) {
            getTheCats(3);             
        }
        else{
            getTheCats(2);          
        }

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
        }
        else{            
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
        <?php
    }
    if (!isset($_GET['action']))
    {
?>
    <header id="smallHeader">
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
        <h1 id="smallHeadertitle"> Stand up !</h1>
    </header>
    <img src="public/img/assto2.png" class="astroImg">      
    <img src="public/img/assto2.png" class="astroImg astroImgTwo"> 
    <img src="public/img/assto2.png" class="astroSmallHeader">      

<?php
}
$alertBox = ob_get_clean();
?>
