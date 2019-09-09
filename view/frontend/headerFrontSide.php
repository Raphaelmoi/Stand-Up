<?php
ob_start();
if (isset($_GET['action']) && $_GET['action'] == 'signin'):
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
            <p><a href="index.php?action=forgotpass">Forgot your password?</a></p>
            <input class="btnFormValidate" type="submit" value="Connexion" >
        </form>
        <div id="triangleYellow" class='topTriangle'></div>
        <div id='triangleTranspa' class='topTriangle'></div>            
    </header>
<?php

elseif (isset($_GET['action']) && $_GET['action'] == 'forgotpass'):
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


        <form class="login-form" action="index.php?action=sendNewPass" method="post">
            <h2 class="form-title">Réinitialiser mot de passe </h2>
            <!-- form validation messages -->
            <div class="form-group">
                <label>Your email address</label>
                <input type="email" name="email" required>
            </div>
            <input class="btnFormValidate" type="submit" name="reset-password" value="Inscription">
<!-- 
            <div class="form-group">
                <button type="submit" name="reset-password" class="login-btn">Submit</button>
            </div> -->
        </form>

        <div id="triangleYellow" class='topTriangle'></div>
        <div id='triangleTranspa' class='topTriangle'></div>            
    </header>
    <?php


    elseif (isset($_GET['action']) && $_GET['action'] == 'pending'):
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


        <p>
            We sent an email to  <b><?php echo $_GET['email'] ?></b> to help you recover your account. 
        </p>
        <p>Please login into your email account and click on the link we sent to reset your password</p>

        <div id="triangleYellow" class='topTriangle'></div>
        <div id='triangleTranspa' class='topTriangle'></div>            
    </header>
    <?php

    elseif (isset($_GET['action']) && $_GET['action'] == 'resetpass'):
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

        <form class="inscriptionBox" action='index.php?action=updatepw' method="post">
            <h2 class="form-title">New password</h2>
            <!-- form validation messages -->

                <label>New password</label>
                <input type="password" name="pass" required>

                <label>Confirm new password</label>
                <input type="password" name="confirmpass" required>
                <input type="hidden" name="token"  value="<?=$_GET['token']?>">

            <input class="btnFormValidate" type="submit" name="submit" value="Changer mdp">

        </form>
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
