<?php
ob_start();
if (isset($_GET['action']) && $_GET['action']!= 'signup'):
    require 'connectForms.php';
    echo $forms;
elseif (isset($_GET['action']) && $_GET['action'] == 'signup'):
        require 'inscriptionForm.php';
        echo $signUpForm;
elseif (!isset($_GET['action'])):
    //DEFAULT VIEW         
?>
    <header id="bigHeader">
        <div class="connect">
            <?php
            if (!empty($_SESSION['pseudo'])):
            ?>
                <div id='backBtn'>
                    <a href="index.php?action=backendHome">profil</a>
                </div>
            <?php
            else:
            ?>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
            <?php endif; ?>
        </div>
        <h1> STAND UP !</h1>
        <div class='topTriangle' id="triangleYellow"></div>
        <div class='topTriangle' id='triangleTranspa'></div>
    </header>

<!-- Defauls small header, for small screen and when user have scrolled on the page -->
    <header id="smallHeader">
        <div class="connect">
            <?php
            if (!empty($_SESSION['pseudo'])):
                ?>
                    <div id='backBtn'>
                        <a href="index.php?action=backendHome">profil</a>
                    </div>
                <?php
            else:
                ?>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
        <?php endif; ?>
        </div>
        <h1 id="smallHeadertitle"> Stand up !</h1>
    </header>
    <img src="public/img/assto2.png" class="astroImg" alt="astronaute">      
    <img src="public/img/assto2.png" class="astroImg astroImgTwo" alt="astronaute"> 
    <img src="public/img/assto2.png" class="astroSmallHeader" alt="astronaute">      
    <?php
endif;
$header = ob_get_clean();
?>
